import { container } from '@test/utility/ioc'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { right } from '@domain/common/utility/either'
import { userRepositoryMock } from '@test/utility/mocks/repositories/userRepository.mock'
import { fakeUserEntity } from '@test/utility/fakes/entities/fakeUserEntity'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { dbTransactionRepositoryMock } from '@test/utility/mocks/repositories/dbTransactionRepository.mock'

describe('2-business.useCases.users.createUser', () => {
  beforeEach(() => {
    container.snapshot()
  })

  afterEach(() => {
    container.restore()
  })

  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock)
  container.bind<IDbTransactionRepository>(IDbTransactionRepositoryToken).toConstantValue(dbTransactionRepositoryMock)

  test('create successful', async () => {
    expect.assertions(3)
    const useCase = container.get(CreateUserUseCase)
    const result = await useCase.exec({
      ...fakeUserEntity,
      resolve: async () => right(undefined),
    })
    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    if (result.isRight()) {
      expect(result.value.name).toBeDefined()
    }
  })
})
