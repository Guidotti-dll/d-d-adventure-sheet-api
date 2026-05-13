import { type IError } from '@domain/common/utility/iError'

export const unknownError = {
  code: 'GEN-001',
  message: 'Unknown error',
  shortMessage: 'unknownError',
}

export const genericError = (name: string): IError => ({
  code: 'GEN-002',
  message: `${name} failed`,
  shortMessage: 'unknownError',
})
