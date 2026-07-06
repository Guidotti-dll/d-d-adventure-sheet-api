import { type OutputDeleteCampaignDto } from '@business/dto/campaigns/deleteCampaignDto'
import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { IsString } from 'class-validator'

export class InputDeleteCampaign extends Validatable<InputDeleteCampaign> {
  @IsString()
  campaignId!: string
}

export type OutputDeleteCampaign = OutputDeleteCampaignDto
