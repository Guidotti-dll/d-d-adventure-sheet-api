import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type IUserEntity } from '@domain/entities/users/userEntity'

export interface InputLoginDto {
  email: string
  password: string
}

export interface LoginResult {
  user: Omit<IUserEntity, 'password'>
  token: string
}

export type OutputLoginDto = Either<IError, LoginResult>
