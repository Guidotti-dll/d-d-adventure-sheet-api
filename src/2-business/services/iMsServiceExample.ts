import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export const IMsServiceExampleToken = Symbol.for('IMsServiceExample')

export type OutputGetData = Either<IError, any[]>

export interface IMsServiceExample {
  getData(): Promise<OutputGetData>
}
