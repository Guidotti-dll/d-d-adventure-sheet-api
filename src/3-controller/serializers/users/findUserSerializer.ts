import { type IUserEntity } from '@domain/entities/users/userEntity'
import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { IsNotEmpty, IsString } from 'class-validator'

export class InputFindUser extends Validatable<InputFindUser> {
  @IsNotEmpty()
  @IsString()
  userId!: string
}

export type OutputFindUser = Either<IError, IUserEntity>
