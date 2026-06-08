import { injectable } from 'inversify'
import { type InputSendPasswordRecoveryEmail, type IEmailService } from '@business/services/iEmailService'
import { Right, type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

@injectable()
export class ConsoleEmailService implements IEmailService {
  async sendPasswordRecoveryEmail(input: InputSendPasswordRecoveryEmail): Promise<Either<IError, void>> {
    const baseUrl = process.env.PASSWORD_RECOVERY_URL ?? 'http://localhost:3000/auth/reset-password'

    console.log({
      passwordRecoveryEmail: {
        to: input.email,
        link: `${baseUrl}?token=${input.token}`,
      },
    })

    return new Right(undefined)
  }
}
