import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { type Pagination } from '@domain/common/dtos/paginationDto'
import { type Either } from '@domain/common/utility/either'
import { type IError } from '@domain/common/utility/iError'
import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'

export class InputListCampaigns extends Validatable<InputListCampaigns> {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  dungeonMasterId?: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}

export type OutputListCampaigns = Either<IError, Pagination<ICampaign>>
