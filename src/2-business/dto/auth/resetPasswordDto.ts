import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputResetPasswordDto {
  token: string
  password: string
}

export type OutputResetPasswordDto = Either<IError, boolean>
