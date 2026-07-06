import { injectable, inject } from 'inversify'
import { type IUseCase } from '@domain/common/useCases/iUseCase'
import { left, right } from '@domain/common/utility/either'
import { ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
import { type ICampaignRepository, ICampaignRepositoryToken } from '@business/repositories/campaign/iCampaignRepository'
import { type InputListCampaignsDto, type OutputListCampaignsDto } from '@business/dto/campaigns/listCampaignsDto'
import { CampaignListingFailed } from '@business/errors/campaign/campaign'

@injectable()
export class ListCampaignsUseCase implements IUseCase<InputListCampaignsDto, OutputListCampaignsDto> {
  public constructor(
    @inject(ICampaignRepositoryToken) private campaignRepository: ICampaignRepository,
    @inject(ILoggerServiceToken) private log: ILoggerService
  ) {}

  async exec(input: InputListCampaignsDto): Promise<OutputListCampaignsDto> {
    try {
      const campaigns = await this.campaignRepository.listBy({
        name: input.name,
        dungeonMasterId: input.dungeonMasterId,
        status: input.status,
        page: input.page,
        limit: input.limit,
      })

      return right(campaigns)
    } catch (error) {
      this.log.error(error)
      return left(CampaignListingFailed)
    }
  }
}
