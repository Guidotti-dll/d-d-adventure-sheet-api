import 'reflect-metadata'
import { container } from '@test/utility/ioc'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { type IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'
import { userRepositoryMock } from '@test/utility/mocks/repositories/userRepository.mock'
import { dbTransactionRepositoryMock } from '@test/utility/mocks/repositories/dbTransactionRepository.mock'
import { encryptServiceMock } from '@test/utility/mocks/services/encryptService.mock'
import { fakeUserEntity } from '@test/utility/fakes/entities/fakeUserEntity'
import { Left, Right } from '@domain/common/utility/either'
import { emailAlreadyInUse, noFieldsToUpdate, UserUpdateFailed, userNotExist } from '@business/errors/users/user'
import { EncryptPasswordFailed } from '@business/errors/services/encryptService'

describe('2-business.useCases.users.updateUser', () => {
  beforeEach(() => {
    container.snapshot()
    jest.clearAllMocks()
    userRepositoryMock.findUserById.mockResolvedValue(fakeUserEntity)
    userRepositoryMock.findUserByEmail.mockResolvedValue(fakeUserEntity)
    userRepositoryMock.update.mockResolvedValue(fakeUserEntity)
    encryptServiceMock.encrypt.mockResolvedValue(new Right('hashed-password'))
  })

  afterEach(() => {
    container.restore()
  })

  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock)
  container.bind<IDbTransactionRepository>(IDbTransactionRepositoryToken).toConstantValue(dbTransactionRepositoryMock)
  container.bind<IEncryptService>(IEncryptServiceToken).toConstantValue(encryptServiceMock)

  test('returns noFieldsToUpdate when no updates provided', async () => {
    expect.assertions(2)

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: 'user-id' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(noFieldsToUpdate)
  })

  test('returns userNotExist when user is not found', async () => {
    expect.assertions(2)

    userRepositoryMock.findUserById.mockResolvedValueOnce(null)

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: 'missing', name: 'x' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(userNotExist)
  })

  test('returns emailAlreadyInUse when email belongs to another user', async () => {
    expect.assertions(2)

    userRepositoryMock.findUserById.mockResolvedValueOnce(fakeUserEntity)
    userRepositoryMock.findUserByEmail.mockResolvedValueOnce({ ...fakeUserEntity, id: 'other-id' })

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: fakeUserEntity.id, email: 'new@example.com' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(emailAlreadyInUse)
  })

  test('updates successfully without password change', async () => {
    expect.assertions(4)

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: fakeUserEntity.id, name: 'New Name' })

    expect(result.isRight()).toBeTruthy()
    expect(userRepositoryMock.update).toHaveBeenCalled()
    expect(encryptServiceMock.encrypt).not.toHaveBeenCalled()
    if (result.isRight()) expect(result.value.name).toBeDefined()
  })

  test('updates successfully with password change', async () => {
    expect.assertions(4)

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: fakeUserEntity.id, password: 'new-password' })

    expect(result.isRight()).toBeTruthy()
    expect(encryptServiceMock.encrypt).toHaveBeenCalledWith('new-password')
    expect(userRepositoryMock.update).toHaveBeenCalled()
    if (result.isRight()) expect(result.value.id).toBe(fakeUserEntity.id)
  })

  test('returns encrypt error when password encryption fails', async () => {
    expect.assertions(2)

    encryptServiceMock.encrypt.mockResolvedValueOnce(new Left(EncryptPasswordFailed))

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: fakeUserEntity.id, password: 'new-password' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(EncryptPasswordFailed)
  })

  test('returns UserUpdateFailed on unexpected error', async () => {
    expect.assertions(2)

    userRepositoryMock.findUserById.mockRejectedValueOnce(new Error('db down'))

    const useCase = container.get(UpdateUserUseCase)
    const result = await useCase.exec({ userId: fakeUserEntity.id, name: 'New Name' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(UserUpdateFailed)
  })
})
