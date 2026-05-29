import 'reflect-metadata'
import { container } from '@test/utility/ioc'
import { DeleteUserUseCase } from '@business/useCases/users/deleteUserUseCase'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { userRepositoryMock } from '@test/utility/mocks/repositories/userRepository.mock'
import { dbTransactionRepositoryMock } from '@test/utility/mocks/repositories/dbTransactionRepository.mock'
import { userNotExist, UserDeletionFailed } from '@business/errors/users/user'

describe('2-business.useCases.users.deleteUser', () => {
  beforeEach(() => {
    container.snapshot()
    jest.clearAllMocks()
  })

  afterEach(() => {
    container.restore()
  })

  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock)
  container.bind<IDbTransactionRepository>(IDbTransactionRepositoryToken).toConstantValue(dbTransactionRepositoryMock)

  test('delete successful', async () => {
    expect.assertions(4)

    const useCase = container.get(DeleteUserUseCase)
    const result = await useCase.exec({ userId: 'user-id' })

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    expect(userRepositoryMock.delete).toHaveBeenCalledWith('user-id', expect.any(Object))
    expect(dbTransactionRepositoryMock.startTransaction).toHaveBeenCalled()
  })

  test('returns userNotExist when user is not found', async () => {
    expect.assertions(2)

    userRepositoryMock.findUserById.mockResolvedValueOnce(null)

    const useCase = container.get(DeleteUserUseCase)
    const result = await useCase.exec({ userId: 'missing-id' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(userNotExist)
  })

  test('returns UserDeletionFailed on unexpected error', async () => {
    expect.assertions(2)

    userRepositoryMock.findUserById.mockRejectedValueOnce(new Error('db down'))

    const useCase = container.get(DeleteUserUseCase)
    const result = await useCase.exec({ userId: 'user-id' })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(UserDeletionFailed)
  })
})
