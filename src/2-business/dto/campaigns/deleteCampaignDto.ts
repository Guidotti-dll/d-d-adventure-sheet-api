import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'

export interface InputDeleteCampaignDto {
  campaignId: string
}

export type OutputDeleteCampaignDto = Either<IError, void>
