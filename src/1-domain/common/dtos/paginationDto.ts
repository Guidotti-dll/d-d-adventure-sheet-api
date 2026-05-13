import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface Pagination<T> {
  items: T[]
  pagination: {
    totalRecords?: number
    totalPages?: number
    limit?: number
    page?: number
    hasPrevPage?: boolean
    hasNextPage?: boolean
    prevPage?: number | null
    nextPage?: number | null
  }
}

export type OutputPaginationDto<T> = Either<IError, Pagination<T>>
