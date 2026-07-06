import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type CampaignStatusEnum } from '@domain/entities/shared/enums/campaignStatus.enum'

export interface InputUpdateCampaignDto {
  campaignId: string
  name?: string
  description?: string
  setting?: string
  status?: CampaignStatusEnum
}

export type OutputUpdateCampaignDto = Either<IError, ICampaign>
