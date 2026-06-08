import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputRequestPasswordRecoveryDto {
  email: string
}

export type OutputRequestPasswordRecoveryDto = Either<IError, boolean>
