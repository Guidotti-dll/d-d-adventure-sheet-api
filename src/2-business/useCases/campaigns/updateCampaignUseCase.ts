import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type ICampaignRepository, ICampaignRepositoryToken } from '@business/repositories/campaign/iCampaignRepository'
import { type InputUpdateCampaignDto, type OutputUpdateCampaignDto } from '@business/dto/campaigns/updateCampaignDto'
import { campaignNotExist, CampaignUpdateFailed } from '@business/errors/campaign/campaign'
import { type ICampaign } from '@domain/entities'

@injectable()
export class UpdateCampaignUseCase implements IUseCase<InputUpdateCampaignDto, OutputUpdateCampaignDto> {
  public constructor(
    @inject(ICampaignRepositoryToken) private campaignRepository: ICampaignRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputUpdateCampaignDto): Promise<OutputUpdateCampaignDto> {
    try {
      const campaign = await this.campaignRepository.findCampaignById(input.campaignId)
      if (!campaign) return left(campaignNotExist)

      const updated: ICampaign = {
        ...campaign,
        name: input.name ?? campaign.name,
        description: input.description ?? campaign.description,
        setting: input.setting ?? campaign.setting,
        status: input.status ?? campaign.status,
      }
      const result = await this.campaignRepository.update(updated)
      return right(result)
    } catch (error) {
      this.log.error(error)
      return left(CampaignUpdateFailed)
    }
  }
}
