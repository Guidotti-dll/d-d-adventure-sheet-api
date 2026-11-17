import { type IEmailService } from '@business/services/iEmailService'
import { Right } from '@domain/common/utility/either'

export const emailServiceMock: jest.Mocked<IEmailService> = {
  createCampaignJoinLink: jest.fn().mockReturnValue('generated-join-link'),
  sendPasswordRecoveryEmail: jest.fn().mockResolvedValue(new Right(undefined)),
  sendCampaignInvitationEmail: jest.fn().mockResolvedValue(new Right(undefined)),
  sendAccountConfirmationEmail: jest.fn().mockResolvedValue(new Right(undefined)),
}
