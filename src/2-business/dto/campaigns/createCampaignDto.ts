import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputCreateCampaignDto {
  dungeonMasterId: string
  name: string
  description?: string
  setting?: string
  resolve?(campaign: ICampaign): Promise<Either<IError, void>>
}

export type OutputCreateCampaignDto = Either<IError, ICampaign>
