import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputDeleteUser extends Validatable<InputDeleteUser> {
  @IsNotEmpty()
  @IsString()
  userId!: string
}

export type OutputDeleteUser = Either<IError, void>
