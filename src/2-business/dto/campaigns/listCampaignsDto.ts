import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type Pagination } from '@domain/common/dtos/paginationDto'

export interface InputListCampaignsDto {
  name?: string
  dungeonMasterId?: string
  status?: string
  page?: number
  limit?: number
}

export type OutputListCampaignsDto = Either<IError, Pagination<ICampaign>>
