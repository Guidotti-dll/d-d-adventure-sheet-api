import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { UserStatus, type IUserEntity } from '@domain/entities/users/userEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class InputUpdateUser extends Validatable<InputUpdateUser> {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus
}

export type OutputUpdateUser = Either<IError, IUserEntity>
