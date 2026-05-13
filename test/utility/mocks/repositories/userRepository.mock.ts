import { type IUserRepository } from '@business/repositories/users/iUserRepository'
import { fakeUserEntity } from '@test/utility/fakes/entities/fakeUserEntity'

export const userRepositoryMock: jest.Mocked<IUserRepository> = {
  create: jest.fn().mockResolvedValue(fakeUserEntity),
  update: jest.fn().mockResolvedValue(fakeUserEntity),
  findUserById: jest.fn().mockResolvedValue(fakeUserEntity),
  listBy: jest.fn().mockResolvedValue({
    items: [fakeUserEntity],
    pagination: {
      limit: 10,
      page: 1,
      totalRecords: 1,
      totalPages: 1,
      nextPage: 0,
      prevPage: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  }),
}
