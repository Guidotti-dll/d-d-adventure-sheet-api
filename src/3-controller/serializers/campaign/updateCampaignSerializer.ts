import { OutputFindCampaignDto } from '@business/dto/campaigns/findCampaignDto'
import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { CampaignStatusEnum } from '@domain/entities'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class InputUpdateCampaign extends Validatable<InputUpdateCampaign> {
  @IsString()
  campaignId!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  setting?: string

  @IsOptional()
  @IsEnum(CampaignStatusEnum)
  status?: CampaignStatusEnum
}

export type OutputUpdateCampaign = OutputFindCampaignDto
