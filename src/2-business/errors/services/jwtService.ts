import { type IError } from '@domain/common/utility/iError'

export const JwtSecretNotConfigured: IError = {
  code: 'JWT-001',
  message: 'JWT secret is not configured',
  shortMessage: 'jwtSecretNotConfigured',
}

export const JwtGenerationFailed: IError = {
  code: 'JWT-002',
  message: 'JWT generation failed',
  shortMessage: 'jwtGenerationFailed',
}

export const JwtInvalidToken: IError = {
  code: 'JWT-003',
  message: 'Invalid JWT token',
  shortMessage: 'jwtInvalidToken',
}

export const JwtExpiredToken: IError = {
  code: 'JWT-004',
  message: 'JWT token has expired',
  shortMessage: 'jwtExpiredToken',
}
