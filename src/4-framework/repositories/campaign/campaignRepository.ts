import { injectable, inject } from 'inversify'
import {
  type ICampaignRepository,
  type InputListCampaignsParams,
} from '@business/repositories/campaign/iCampaignRepository'
import { type ICampaign } from '@domain/entities/campaign/campaignEntity'
import { CampaignModel } from '@framework/models/campaign/campaignModel'
import { type FindOptionsWhere, ILike, Repository } from 'typeorm'
import { type DbTransaction } from '@framework/repositories/dbTransaction/dbTransaction'
import { type Pagination } from '@domain/common/dtos/paginationDto'
import { TypeormPagination } from '@framework/utility/typeorm/typeormPagination'

@injectable()
export class CampaignRepository implements ICampaignRepository {
  public constructor(@inject('CampaignModel') private campaignRepository: Repository<CampaignModel>) {}

  async findCampaignById(campaignId: string): Promise<ICampaign | null> {
    const where = { id: campaignId }
    return this.campaignRepository.findOne({ where, transaction: true })
  }

  async create(campaign: ICampaign, trx?: DbTransaction): Promise<ICampaign> {
    const repository = trx ? await trx.getRepository(CampaignModel) : this.campaignRepository
    const c = repository.create({
      id: campaign.id,
      dungeonMasterId: campaign.dungeonMasterId,
      name: campaign.name,
      description: campaign.description,
      setting: campaign.setting,
      status: campaign.status,
      visibility: campaign.visibility,
    })
    await repository.save(c)
    return c
  }

  async update(campaign: ICampaign, trx?: DbTransaction): Promise<ICampaign> {
    const repository = trx ? await trx.getRepository(CampaignModel) : this.campaignRepository
    await repository.update({ id: campaign.id }, campaign)
    const updated = await repository.findOne({ where: { id: campaign.id } })
    return updated ?? campaign
  }

  async delete(campaignId: string, trx?: DbTransaction): Promise<void> {
    const repository = trx ? await trx.getRepository(CampaignModel) : this.campaignRepository
    await repository.delete({ id: campaignId })
  }

  async listBy(params: InputListCampaignsParams): Promise<Pagination<ICampaign>> {
    const page = params.page ?? 1
    const limit = params.limit ?? 10

    const where: FindOptionsWhere<CampaignModel> = {}

    if (params.name) where.name = ILike(`%${params.name}%`)
    if (params.dungeonMasterId) where.dungeonMasterId = params.dungeonMasterId
    if (params.status) where.status = params.status as any

    const { items, pagination } = await TypeormPagination.getData<ICampaign, CampaignModel>({
      repository: this.campaignRepository,
      limit,
      page,
      options: { where, order: { createdAt: 'DESC' } },
      serviceName: 'CampaignRepository',
      usingModel: true,
    })

    return { items, pagination }
  }
}
