import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type LoginResult } from '@business/dto/auth/loginDto'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputLogin extends Validatable<InputLogin> {
  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export type OutputLogin = Either<IError, LoginResult>
