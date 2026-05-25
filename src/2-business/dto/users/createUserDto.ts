import { type IUserEntity } from '@domain/entities/users/userEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputCreateUserDto {
  name: string
  email: string
  password: string
  resolve?(user: IUserEntity): Promise<Either<IError, void>>
}

export type OutputCreateUserDto = Either<IError, IUserEntity>
