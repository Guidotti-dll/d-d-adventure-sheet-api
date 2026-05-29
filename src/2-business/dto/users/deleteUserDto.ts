import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputDeleteUserDto {
  userId: string
}

export type OutputDeleteUserDto = Either<IError, void>
