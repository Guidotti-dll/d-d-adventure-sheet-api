import { type IError } from '@domain/common/utility/iError'
import * as domainUserErrors from '@domain/errors/user'
import * as authErrors from '@business/errors/auth/auth'
import * as jwtErrors from '@business/errors/services/jwtService'
import * as encryptErrors from '@business/errors/services/encryptService'
import * as userErrors from '@business/errors/users/user'

const byShortMessage: Record<string, number> = {
  [authErrors.invalidCredentials.shortMessage]: 401,
  [authErrors.userInactive.shortMessage]: 403,
  [authErrors.loginFailed.shortMessage]: 500,
  [authErrors.tokenMissing.shortMessage]: 401,
  [jwtErrors.JwtSecretNotConfigured.shortMessage]: 500,
  [jwtErrors.JwtGenerationFailed.shortMessage]: 500,
  [jwtErrors.JwtInvalidToken.shortMessage]: 401,
  [jwtErrors.JwtExpiredToken.shortMessage]: 401,
  [encryptErrors.ComparePasswordFailed.shortMessage]: 500,
  [encryptErrors.EncryptPasswordFailed.shortMessage]: 500,
  [userErrors.userNotExist.shortMessage]: 404,
  [userErrors.UserCreationFailed.shortMessage]: 500,
  [domainUserErrors.invalidEmailDomainError.shortMessage]: 400,
}

export function mapBusinessErrorToStatus(error: IError): number {
  return byShortMessage[error.shortMessage] ?? 400
}
