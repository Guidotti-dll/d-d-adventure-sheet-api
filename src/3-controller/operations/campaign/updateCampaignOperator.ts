import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { UpdateCampaignUseCase } from '@business/useCases/campaigns/updateCampaignUseCase'
import {
  type InputUpdateCampaign,
  type OutputUpdateCampaign,
} from '@controller/serializers/campaign/updateCampaignSerializer'

@injectable()
export class UpdateCampaignOperator extends AbstractOperator<InputUpdateCampaign, OutputUpdateCampaign> {
  public constructor(@inject(UpdateCampaignUseCase) private updateCampaignUseCase: UpdateCampaignUseCase) {
    super()
  }

  protected async run(input: InputUpdateCampaign): Promise<OutputUpdateCampaign> {
    return this.updateCampaignUseCase.exec({
      campaignId: input.campaignId,
      name: input.name,
      description: input.description,
      setting: input.setting,
      status: input.status,
    })
  }
}
