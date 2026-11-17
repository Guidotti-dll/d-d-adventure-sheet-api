import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputCreateCampaignDto {
  dungeonMasterId: string
  name: string
  description?: string
  emails?: string[]
  resolve?(campaign: ICampaign): Promise<Either<IError, void>>
}

export interface CreatedCampaign {
  campaign: ICampaign
  joinLink: string
}

export type OutputCreateCampaignDto = Either<IError, CreatedCampaign>
