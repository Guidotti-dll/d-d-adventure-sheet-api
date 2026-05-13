import { type IUserEntity, UserTypes } from '@domain/entities/users/userEntity'

export const fakeUserEntity: IUserEntity = {
  name: 'test',
  email: 'test@example.com',
  password: 'password',
  type: UserTypes.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
}
