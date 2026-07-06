import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { DeleteCampaignUseCase } from '@business/useCases/campaigns/deleteCampaignUseCase'
import {
  type InputDeleteCampaign,
  type OutputDeleteCampaign,
} from '@controller/serializers/campaign/deleteCampaignSerializer'

@injectable()
export class DeleteCampaignOperator extends AbstractOperator<InputDeleteCampaign, OutputDeleteCampaign> {
  public constructor(@inject(DeleteCampaignUseCase) private deleteCampaignUseCase: DeleteCampaignUseCase) {
    super()
  }

  protected async run(input: InputDeleteCampaign): Promise<OutputDeleteCampaign> {
    return this.deleteCampaignUseCase.exec({ campaignId: input.campaignId })
  }
}
