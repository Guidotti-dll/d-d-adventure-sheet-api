import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type ICampaignRepository, ICampaignRepositoryToken } from '@business/repositories/campaign/iCampaignRepository'
import { type InputFindCampaignDto, type OutputFindCampaignDto } from '@business/dto/campaigns/findCampaignDto'
import { campaignNotExist } from '@business/errors/campaign/campaign'

@injectable()
export class FindCampaignUseCase implements IUseCase<InputFindCampaignDto, OutputFindCampaignDto> {
  public constructor(
    @inject(ICampaignRepositoryToken) private campaignRepository: ICampaignRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputFindCampaignDto): Promise<OutputFindCampaignDto> {
    try {
      const campaign = await this.campaignRepository.findCampaignById(input.campaignId)

      if (!campaign) return left(campaignNotExist)

      return right(campaign)
    } catch (error) {
      this.log.error(error)
      return left(campaignNotExist)
    }
  }
}
