import { Resend } from 'resend'
import { injectable } from 'inversify'
import { Left, Right, type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { EmailSendFailed } from '@business/errors/services/emailService'
import {
  type InputSendAccountConfirmationEmail,
  type InputSendCampaignInvitationEmail,
  type InputSendPasswordRecoveryEmail,
  type IEmailService,
} from '@business/services/iEmailService'
import { accountConfirmationEmailTemplate } from '@framework/services/email/templates/accountConfirmationEmail'
import { campaignInvitationEmailTemplate } from '@framework/services/email/templates/campaignInvitationEmail'
import { passwordRecoveryEmailTemplate } from '@framework/services/email/templates/passwordRecoveryEmail'

@injectable()
export class ResendEmailService implements IEmailService {
  private readonly resend: Resend
  private readonly from: string

  public constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
    this.from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev'
  }

  createCampaignJoinLink(campaignId: string): string {
    const frontendUrl = (process.env.FRONTEND_URL ?? 'http://localhost:3000').split(',')[0] ?? 'http://localhost:3000'
    return `${frontendUrl.replace(/\/$/, '')}/dashboard/campaigns/${campaignId}/join`
  }

  async sendPasswordRecoveryEmail(input: InputSendPasswordRecoveryEmail): Promise<Either<IError, void>> {
    const baseUrl = process.env.PASSWORD_RECOVERY_URL ?? 'http://localhost:3000/auth/reset-password'
    const separator = baseUrl.includes('?') ? '&' : '?'
    const link = `${baseUrl}${separator}token=${encodeURIComponent(input.token)}`

    return this.send({
      to: input.email,
      subject: 'Redefina sua senha',
      html: passwordRecoveryEmailTemplate({ link }),
    })
  }

  async sendCampaignInvitationEmail(input: InputSendCampaignInvitationEmail): Promise<Either<IError, void>> {
    return this.send({
      to: input.email,
      subject: `Convite para participar de ${input.campaignName}`,
      html: campaignInvitationEmailTemplate({ campaignName: input.campaignName, link: input.joinLink }),
    })
  }

  async sendAccountConfirmationEmail(input: InputSendAccountConfirmationEmail): Promise<Either<IError, void>> {
    return this.send({
      to: input.email,
      subject: 'Confirme sua conta',
      html: accountConfirmationEmailTemplate({ name: input.name, link: input.confirmationLink }),
    })
  }

  private async send(input: { to: string; subject: string; html: string }): Promise<Either<IError, void>> {
    try {
      const { error } = await this.resend.emails.send({
        from: this.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
      })

      if (error) {
        console.error({ emailSendError: error })
        return new Left(EmailSendFailed)
      }

      return new Right(undefined)
    } catch (error) {
      console.error({ emailSendError: error })
      return new Left(EmailSendFailed)
    }
  }
}
