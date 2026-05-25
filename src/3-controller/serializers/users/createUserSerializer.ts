import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type IUserEntity } from '@domain/entities/users/userEntity'
import { IsNotEmpty, IsString } from 'class-validator'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export class InputCreateUser extends Validatable<InputCreateUser> {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}

export type OutputCreateUser = Either<IError, IUserEntity>
