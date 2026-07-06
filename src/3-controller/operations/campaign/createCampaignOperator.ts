import { injectable, inject } from 'inversify'
import { AbstractOperator } from '@domain/common/operators/abstractOperator'
import { CreateCampaignUseCase } from '@business/useCases/campaigns/createCampaignUseCase'
import { type InputCreateCampaign } from '@controller/serializers/campaign/createCampaignSerializer'

@injectable()
export class CreateCampaignOperator extends AbstractOperator<InputCreateCampaign, any> {
  public constructor(@inject(CreateCampaignUseCase) private createCampaignUseCase: CreateCampaignUseCase) {
    super()
  }

  protected async run(input: InputCreateCampaign): Promise<any> {
    return this.createCampaignUseCase.exec({
      dungeonMasterId: input.dungeonMasterId,
      name: input.name,
      description: input.description,
      setting: input.setting,
    })
  }
}
