import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { ListCampaignsUseCase } from '@business/useCases/campaigns/listCampaignsUseCase'
import {
  type InputListCampaigns,
  type OutputListCampaigns,
} from '@controller/serializers/campaign/listCampaignsSerializer'

@injectable()
export class ListCampaignsOperator extends AbstractOperator<InputListCampaigns, OutputListCampaigns> {
  public constructor(@inject(ListCampaignsUseCase) private listCampaignsUseCase: ListCampaignsUseCase) {
    super()
  }

  protected async run(input: InputListCampaigns): Promise<OutputListCampaigns> {
    return this.listCampaignsUseCase.exec({
      name: input.name,
      dungeonMasterId: input.dungeonMasterId,
      status: input.status,
      page: input.page,
      limit: input.limit,
    })
  }
}
