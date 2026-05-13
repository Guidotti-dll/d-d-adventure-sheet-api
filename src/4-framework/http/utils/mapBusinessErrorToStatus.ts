import { type IError } from '@domain/common/utility/iError'
import * as domainUserErrors from '@domain/errors/user'
import * as userErrors from '@business/module/errors/users/user'

const byShortMessage: Record<string, number> = {
  [userErrors.userNotExist.shortMessage]: 404,
  [userErrors.UserCreationFailed.shortMessage]: 500,
  [domainUserErrors.invalidEmailDomainError.shortMessage]: 400,
}

export function mapBusinessErrorToStatus(error: IError): number {
  return byShortMessage[error.shortMessage] ?? 400
}
