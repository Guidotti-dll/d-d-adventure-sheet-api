import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export const IEmailServiceToken = Symbol.for('IEmailService')

export interface InputSendPasswordRecoveryEmail {
  email: string
  token: string
}

export interface IEmailService {
  sendPasswordRecoveryEmail(input: InputSendPasswordRecoveryEmail): Promise<Either<IError, void>>
}
