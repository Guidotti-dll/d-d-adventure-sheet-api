import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class InputResetPassword extends Validatable<InputResetPassword> {
  @IsNotEmpty()
  @IsString()
  token!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string
}

export type OutputResetPassword = Either<IError, boolean>
