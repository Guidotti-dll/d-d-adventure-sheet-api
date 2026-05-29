import { type Pagination } from '@domain/common/dtos/paginationDto'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type IUserEntity } from '@domain/entities/users/userEntity'

export interface InputListUsersDto {
  name?: string
  email?: string
  page?: number
  limit?: number
}

export type OutputListUsersDto = Either<IError, Pagination<IUserEntity>>
