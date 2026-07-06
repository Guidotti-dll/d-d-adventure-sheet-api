import { type OutputFindCampaignDto } from '@business/dto/campaigns/findCampaignDto'
import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { IsString } from 'class-validator'

export class InputFindCampaign extends Validatable<InputFindCampaign> {
  @IsString()
  campaignId!: string
}

export type OutputFindCampaign = OutputFindCampaignDto
