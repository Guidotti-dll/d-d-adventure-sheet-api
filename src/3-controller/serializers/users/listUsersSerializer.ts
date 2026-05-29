import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Pagination } from '@domain/common/dtos/paginationDto'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type IUserEntity } from '@domain/entities/users/userEntity'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'

export class InputListUsers extends Validatable<InputListUsers> {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}

export type OutputListUsers = Either<IError, Pagination<IUserEntity>>
