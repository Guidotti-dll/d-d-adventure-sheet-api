import 'reflect-metadata'
import { container } from '@test/utility/ioc'
import { LoginUseCase } from '@business/useCases/auth/loginUseCase'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { type IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'
import { type IJwtService, IJwtServiceToken } from '@business/services/iJwtService'
import { userRepositoryMock } from '@test/utility/mocks/repositories/userRepository.mock'
import { encryptServiceMock } from '@test/utility/mocks/services/encryptService.mock'
import { jwtServiceMock } from '@test/utility/mocks/services/jwtService.mock'
import { fakeUserEntity } from '@test/utility/fakes/entities/fakeUserEntity'
import { Left, Right } from '@domain/common/utility/either'
import { invalidCredentials, loginFailed, userInactive } from '@business/errors/auth/auth'
import { ComparePasswordFailed } from '@business/errors/services/encryptService'
import { JwtGenerationFailed } from '@business/errors/services/jwtService'
import { UserStatus } from '@domain/entities/users/userEntity'

describe('2-business.useCases.auth.login', () => {
  beforeEach(() => {
    container.snapshot()
    jest.clearAllMocks()
    encryptServiceMock.compare.mockResolvedValue(new Right(true))
    jwtServiceMock.generateToken.mockResolvedValue(new Right('jwt-token'))
    userRepositoryMock.findUserByEmail.mockResolvedValue(fakeUserEntity)
  })

  afterEach(() => {
    container.restore()
  })

  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock)
  container.bind<IEncryptService>(IEncryptServiceToken).toConstantValue(encryptServiceMock)
  container.bind<IJwtService>(IJwtServiceToken).toConstantValue(jwtServiceMock)

  test('login successful', async () => {
    expect.assertions(6)

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: fakeUserEntity.email,
      password: 'password',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()

    if (result.isRight()) {
      expect(result.value.token).toBe('jwt-token')
      expect(result.value.user.id).toBe(fakeUserEntity.id)
      expect(result.value.user).not.toHaveProperty('password')
    }

    expect(encryptServiceMock.compare).toHaveBeenCalledWith({
      plain: 'password',
      encrypted: fakeUserEntity.password,
    })
  })

  test('returns invalidCredentials when user is not found', async () => {
    userRepositoryMock.findUserByEmail.mockResolvedValueOnce(null)

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: 'missing@example.com',
      password: 'password',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toEqual(invalidCredentials)
    }
  })

  test('returns userInactive when user status is not ACTIVE', async () => {
    userRepositoryMock.findUserByEmail.mockResolvedValueOnce({
      ...fakeUserEntity,
      status: UserStatus.INACTIVE,
    })

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: fakeUserEntity.email,
      password: 'password',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toEqual(userInactive)
    }
  })

  test('returns invalidCredentials when password does not match', async () => {
    encryptServiceMock.compare.mockResolvedValueOnce(new Right(false))

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: fakeUserEntity.email,
      password: 'wrong-password',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toEqual(invalidCredentials)
    }
  })

  test('returns encrypt error when password comparison fails', async () => {
    encryptServiceMock.compare.mockResolvedValueOnce(new Left(ComparePasswordFailed))

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: fakeUserEntity.email,
      password: 'password',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toEqual(ComparePasswordFailed)
    }
  })

  test('returns jwt error when token generation fails', async () => {
    jwtServiceMock.generateToken.mockResolvedValueOnce(new Left(JwtGenerationFailed))

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: fakeUserEntity.email,
      password: 'password',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toEqual(JwtGenerationFailed)
    }
  })

  test('returns loginFailed when an unexpected error occurs', async () => {
    userRepositoryMock.findUserByEmail.mockRejectedValueOnce(new Error('database unavailable'))

    const useCase = container.get(LoginUseCase)
    const result = await useCase.exec({
      email: fakeUserEntity.email,
      password: 'password',
    })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) {
      expect(result.value).toEqual(loginFailed)
    }
  })
})
