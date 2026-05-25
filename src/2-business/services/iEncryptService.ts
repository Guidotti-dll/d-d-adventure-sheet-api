import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export const IEncryptServiceToken = Symbol.for('IEncryptService')

export interface InputCompare {
  plain: string
  encrypted: string
}

export interface IEncryptService {
  generateUuid(): string
  encrypt(value: string): Promise<Either<IError, string>>
  compare(input: InputCompare): Promise<Either<IError, boolean>>
}
