import { injectable } from 'inversify'
import {
  type InputSendCampaignInvitationEmail,
  type InputSendAccountConfirmationEmail,
  type InputSendPasswordRecoveryEmail,
  type IEmailService,
} from '@business/services/iEmailService'
import { Right, type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

@injectable()
export class ConsoleEmailService implements IEmailService {
  createCampaignJoinLink(campaignId: string): string {
    const frontendUrl = (process.env.FRONTEND_URL ?? 'http://localhost:3000').split(',')[0] ?? 'http://localhost:3000'
    return `${frontendUrl.replace(/\/$/, '')}/dashboard/campaigns/${campaignId}/join`
  }

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

  async sendCampaignInvitationEmail(input: InputSendCampaignInvitationEmail): Promise<Either<IError, void>> {
    console.log({
      campaignInvitationEmail: {
        to: input.email,
        campaign: input.campaignName,
        link: input.joinLink,
      },
    })

    return new Right(undefined)
  }

  async sendAccountConfirmationEmail(input: InputSendAccountConfirmationEmail): Promise<Either<IError, void>> {
    console.log({
      accountConfirmationEmail: {
        to: input.email,
        name: input.name,
        link: input.confirmationLink,
      },
    })

    return new Right(undefined)
  }
}
