import 'reflect-metadata'
import { container } from '@test/utility/ioc'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { type IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { userRepositoryMock } from '@test/utility/mocks/repositories/userRepository.mock'
import { UserListingFailed } from '@business/errors/users/user'

describe('2-business.useCases.users.listUsers', () => {
  beforeEach(() => {
    container.snapshot()
    jest.clearAllMocks()
  })

  afterEach(() => {
    container.restore()
  })

  container.bind<IUserRepository>(IUserRepositoryToken).toConstantValue(userRepositoryMock)

  test('list successful (defaults)', async () => {
    expect.assertions(4)

    const useCase = container.get(ListUsersUseCase)
    const result = await useCase.exec({})

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
    expect(userRepositoryMock.listBy).toHaveBeenCalledWith({ name: undefined, email: undefined, page: 1, limit: 10 })
    if (result.isRight()) expect(result.value.items.length).toBeGreaterThan(0)
  })

  test('list successful (custom pagination + filters)', async () => {
    expect.assertions(3)

    const useCase = container.get(ListUsersUseCase)
    const result = await useCase.exec({ name: 'te', email: 'ex', page: 2, limit: 5 })

    expect(result.isRight()).toBeTruthy()
    expect(userRepositoryMock.listBy).toHaveBeenCalledWith({ name: 'te', email: 'ex', page: 2, limit: 5 })
    if (result.isRight()) expect(result.value.pagination.page).toBeDefined()
  })

  test('returns UserListingFailed on unexpected error', async () => {
    expect.assertions(2)

    userRepositoryMock.listBy.mockRejectedValueOnce(new Error('db down'))

    const useCase = container.get(ListUsersUseCase)
    const result = await useCase.exec({ page: 1, limit: 10 })

    expect(result.isLeft()).toBeTruthy()
    if (result.isLeft()) expect(result.value).toEqual(UserListingFailed)
  })
})
