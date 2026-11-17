import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type ICampaignRepository, ICampaignRepositoryToken } from '@business/repositories/campaign/iCampaignRepository'
import { CampaignEntity } from '@domain/entities/campaign/campaignEntity'
import { type InputCreateCampaignDto, type OutputCreateCampaignDto } from '@business/dto/campaigns/createCampaignDto'
import { IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { CampaignCreationFailed } from '@business/errors/campaign/campaign'
import { IEmailService, IEmailServiceToken } from '@business/services/iEmailService'

@injectable()
export class CreateCampaignUseCase implements IUseCase<InputCreateCampaignDto, OutputCreateCampaignDto> {
  public constructor(
    @inject(ICampaignRepositoryToken) private campaignRepository: ICampaignRepository,
    @inject(IDbTransactionRepositoryToken) private dbTransactionRepository: IDbTransactionRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService,
    @inject(IEncryptServiceToken) private encrypt: IEncryptService,
    @inject(IEmailServiceToken) private emailService: IEmailService
  ) {}

  async exec(input: InputCreateCampaignDto): Promise<OutputCreateCampaignDto> {
    try {
      const uuid = this.encrypt.generateUuid()

      const campaignEntity = CampaignEntity.create({
        id: uuid,
        dungeonMasterId: input.dungeonMasterId,
        name: input.name,
        description: input.description ?? '',
      })

      if (campaignEntity.isLeft()) return left(campaignEntity.value)

      const trx = await this.dbTransactionRepository.startTransaction()
      const campaign = await this.campaignRepository.create(campaignEntity.value.export(), trx)
      await trx.commit()

      const joinLink = this.emailService.createCampaignJoinLink(campaign.id)
      const emails = [...new Set((input.emails ?? []).map(email => email.trim().toLowerCase()).filter(Boolean))]

      for (const email of emails) {
        const emailResult = await this.emailService.sendCampaignInvitationEmail({
          email,
          campaignName: campaign.name,
          joinLink,
        })

        if (emailResult.isLeft()) {
          this.log.error(emailResult.value)
        }
      }

      return right({ campaign, joinLink })
    } catch (error) {
      this.log.error(error)
      return left(CampaignCreationFailed)
    }
  }
}
