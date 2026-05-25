import { type IUserEntity, UserTypes, UserStatus } from '@domain/entities/users/userEntity'

export const fakeUserEntity: IUserEntity = {
  id: 'user-id',
  name: 'test',
  email: 'test@example.com',
  password: 'password',
  type: UserTypes.USER,
  status: UserStatus.ACTIVE,
  createdAt: new Date(),
  updatedAt: new Date(),
}
