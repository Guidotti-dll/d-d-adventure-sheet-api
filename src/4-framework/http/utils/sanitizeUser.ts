import { type IUserEntity } from '@domain/entities/users/userEntity'

export function sanitizeUser(user: IUserEntity): Omit<IUserEntity, 'password'> {
  const { password: _password, ...rest } = user
  return rest
}
