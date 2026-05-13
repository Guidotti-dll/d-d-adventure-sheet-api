import { type IUserEntity } from '@domain/entities/users/userEntity'
import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class InputFindUser extends Validatable<InputFindUser> {
  @IsNotEmpty()
  @IsNumber()
  userId!: number
}

export type OutputFindUser = Either<IError, IUserEntity>
