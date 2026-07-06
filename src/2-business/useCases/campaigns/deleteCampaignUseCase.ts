import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type ICampaignRepository, ICampaignRepositoryToken } from '@business/repositories/campaign/iCampaignRepository'
import { type InputDeleteCampaignDto, type OutputDeleteCampaignDto } from '@business/dto/campaigns/deleteCampaignDto'
import { campaignNotExist, CampaignDeletionFailed } from '@business/errors/campaign/campaign'

@injectable()
export class DeleteCampaignUseCase implements IUseCase<InputDeleteCampaignDto, OutputDeleteCampaignDto> {
  public constructor(
    @inject(ICampaignRepositoryToken) private campaignRepository: ICampaignRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputDeleteCampaignDto): Promise<OutputDeleteCampaignDto> {
    try {
      const campaign = await this.campaignRepository.findCampaignById(input.campaignId)
      if (!campaign) return left(campaignNotExist)

      await this.campaignRepository.delete(input.campaignId)
      return right(undefined)
    } catch (error) {
      this.log.error(error)
      return left(CampaignDeletionFailed)
    }
  }
}
