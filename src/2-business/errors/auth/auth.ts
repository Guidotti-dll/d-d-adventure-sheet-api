import { type IError } from '@domain/common/utility/iError'

export const invalidCredentials: IError = {
  code: 'ATH-001',
  message: 'Invalid credentials',
  shortMessage: 'invalidCredentials',
}

export const userInactive: IError = {
  code: 'ATH-002',
  message: 'User is inactive',
  shortMessage: 'userInactive',
}

export const loginFailed: IError = {
  code: 'ATH-003',
  message: 'Login failed',
  shortMessage: 'loginFailed',
}

export const tokenMissing: IError = {
  code: 'ATH-004',
  message: 'Authentication token is required',
  shortMessage: 'tokenMissing',
}
