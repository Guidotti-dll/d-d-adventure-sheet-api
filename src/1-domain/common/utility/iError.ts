import { type Left } from '@domain/common/utility/either'

export interface IError {
  code: string
  message: string
  shortMessage: string
}

export function isIError<Error extends IError, Input>(error: any): error is Left<Error, Input> {
  if (!error) return false
  const { value } = error

  return !!value?.code && !!value?.message && !!value?.shortMessage
}
