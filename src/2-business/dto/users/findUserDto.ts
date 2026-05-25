import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type IUserEntity } from '@domain/entities/users/userEntity'

export interface InputFindUserDto {
  userId: string
}

export type OutputFindUserDto = Either<IError, IUserEntity>
