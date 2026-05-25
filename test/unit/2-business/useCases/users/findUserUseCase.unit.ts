import 'reflect-metadata'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { userRepositoryMock } from '@test/utility/mocks/repositories/userRepository.mock'
import { container } from '@test/utility/ioc'

describe('2-business.useCases.users.findUser', () => {
  beforeEach(() => {
    container.snapshot()
  })

  afterEach(() => {
    container.restore()
  })

  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock)

  test('find successful', async () => {
    expect.assertions(3)
    const useCase = container.get(FindUserUseCase)
    const result = await useCase.exec({
      userId: 'user-id',
    })
    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    if (result.isRight()) {
      expect(result.value.name).toBeDefined()
    }
  })
})
