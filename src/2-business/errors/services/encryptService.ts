import { type IError } from '@domain/common/utility/iError'

export const EncryptPasswordFailed: IError = {
  code: 'ENS-001',
  message: 'Encrypt password error',
  shortMessage: 'EncryptPasswordFailed',
}

export const ComparePasswordFailed: IError = {
  code: 'ENS-002',
  message: 'Compare password error',
  shortMessage: 'ComparePasswordFailed',
}
