import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { type IDbTransaction } from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { type Pagination } from '@domain/common/dtos/paginationDto'

export const ICampaignRepositoryToken = Symbol.for('ICampaignRepository')

export interface InputListCampaignsParams {
  name?: string
  dungeonMasterId?: string
  status?: string
  page?: number
  limit?: number
}

export interface ICampaignRepository {
  create(campaign: ICampaign, trx?: IDbTransaction): Promise<ICampaign>
  update(campaign: ICampaign, trx?: IDbTransaction): Promise<ICampaign>
  delete(campaignId: string, trx?: IDbTransaction): Promise<void>
  findCampaignById(campaignId: string): Promise<ICampaign | null>
  listBy(params: InputListCampaignsParams): Promise<Pagination<ICampaign>>
}
