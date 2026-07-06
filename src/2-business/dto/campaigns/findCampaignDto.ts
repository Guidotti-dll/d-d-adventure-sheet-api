import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputFindCampaignDto {
  campaignId: string
}

export type OutputFindCampaignDto = Either<IError, ICampaign>
