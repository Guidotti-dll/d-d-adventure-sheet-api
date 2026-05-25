import { type Pagination } from '@domain/common/dtos/paginationDto'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type UserEntity } from '@domain/entities/users/userEntity'

export interface InputListUserDto {
  name?: string
  email?: string
  page?: number
  limit?: number
}

export type OutputListUserDto = Either<IError, Pagination<UserEntity>>
