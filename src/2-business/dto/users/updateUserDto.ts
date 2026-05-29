import { type IUserEntity, type UserStatus } from '@domain/entities/users/userEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputUpdateUserDto {
  userId: string
  name?: string
  email?: string
  password?: string
  status?: UserStatus
}

export type OutputUpdateUserDto = Either<IError, IUserEntity>
