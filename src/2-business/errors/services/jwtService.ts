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
