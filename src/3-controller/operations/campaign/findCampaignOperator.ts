import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { FindCampaignUseCase } from '@business/useCases/campaigns/findCampaignUseCase'
import {
  type InputFindCampaign,
  type OutputFindCampaign,
} from '@controller/serializers/campaign/findCampaignSerializer'

@injectable()
export class FindCampaignOperator extends AbstractOperator<InputFindCampaign, OutputFindCampaign> {
  public constructor(@inject(FindCampaignUseCase) private findCampaignUseCase: FindCampaignUseCase) {
    super()
  }

  protected async run(input: InputFindCampaign): Promise<OutputFindCampaign> {
    return this.findCampaignUseCase.exec({ campaignId: input.campaignId })
  }
}
