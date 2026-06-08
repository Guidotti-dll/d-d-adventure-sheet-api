import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class InputRequestPasswordRecovery extends Validatable<InputRequestPasswordRecovery> {
  @IsNotEmpty()
  @IsEmail()
  email!: string
}

export type OutputRequestPasswordRecovery = Either<IError, boolean>
