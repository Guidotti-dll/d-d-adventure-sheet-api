import { type IError } from '@domain/common/utility/iError'

export const passwordRecoveryRequestFailed: IError = {
  code: 'ATH-005',
  message: 'Password recovery request failed',
  shortMessage: 'passwordRecoveryRequestFailed',
}

export const passwordResetFailed: IError = {
  code: 'ATH-006',
  message: 'Password reset failed',
  shortMessage: 'passwordResetFailed',
}

export const invalidRecoveryToken: IError = {
  code: 'ATH-007',
  message: 'Invalid recovery token',
  shortMessage: 'invalidRecoveryToken',
}

export const recoveryTokenExpired: IError = {
  code: 'ATH-008',
  message: 'Recovery token has expired',
  shortMessage: 'recoveryTokenExpired',
}

export const recoveryTokenAlreadyUsed: IError = {
  code: 'ATH-009',
  message: 'Recovery token has already been used',
  shortMessage: 'recoveryTokenAlreadyUsed',
}
