import { type Pagination } from '@domain/common/dtos/paginationDto'
import { ConsoleLogService } from '@domain/common/services/consoleLogService'
import {
  type DataSource,
  type FindManyOptions,
  type ObjectLiteral,
  type Repository,
  type SelectQueryBuilder,
} from 'typeorm'

export interface PaginationParams {
  limit?: number | undefined
  page?: number | undefined
}

export interface InputGetPagination extends PaginationParams {
  totalRecords: number
}

export interface RepositoryParams<Entity extends ObjectLiteral = ObjectLiteral> {
  query: SelectQueryBuilder<Entity>
  connection: DataSource
  serviceName: string
  usingModel: boolean
}

interface BaseGetDataParams<Data> extends PaginationParams {
  serviceName: string
  mapper?(data: any[]): Data[]
  usingModel: boolean
}

interface QueryGetDataParams<Data, Entity extends ObjectLiteral = ObjectLiteral> extends BaseGetDataParams<Data> {
  connection: DataSource
  query: SelectQueryBuilder<Entity>
}

interface OptionsGetDataParams<Data, Entity extends ObjectLiteral = ObjectLiteral> extends BaseGetDataParams<Data> {
  repository: Repository<Entity>
  usingModel: true
  options: Omit<FindManyOptions<Entity>, 'skip' | 'take'>
}

export type InputGetData<Data, Entity extends ObjectLiteral = ObjectLiteral> =
  | (QueryGetDataParams<Data, Entity> & { usingModel: false })
  | (OptionsGetDataParams<Data, Entity> & { usingModel: true })

export class TypeormPagination {
  private static readonly loggerService = new ConsoleLogService()

  private static validatePaginationParams({ limit, page }: PaginationParams): void {
    if (!page || !limit) return

    if (limit <= 0 || page <= 0) {
      throw new Error('Limit and page must be positive numbers.')
    }
  }

  static async getTotalRecords<Entity extends ObjectLiteral = ObjectLiteral>({
    connection,
    query,
    serviceName,
    usingModel,
  }: RepositoryParams<Entity>): Promise<number> {
    try {
      let countRaw
      if (usingModel) {
        const count = await query.getCount()
        countRaw = count
      } else {
        const clonedQuery = query.clone()
        const countQuery = connection
          .createQueryBuilder()
          .select('COUNT(*)', 'total')
          .from(`(${clonedQuery.getQuery()})`, serviceName)
          .setParameters(clonedQuery.getParameters())

        const count = await countQuery.getRawOne()

        countRaw = count?.total
      }

      const totalRecords = Number(countRaw || 0)

      this.loggerService.info(`Total items found: ${totalRecords}`, {
        service: 'TypeormPagination',
      })

      return totalRecords
    } catch (error) {
      this.loggerService.error(`Error counting items`, {
        service: 'TypeormPagination',
      })
      throw error
    }
  }

  static getPagination<Data>({ limit, page = 1, totalRecords }: InputGetPagination): Pagination<Data>['pagination'] {
    this.validatePaginationParams({ limit, page })

    const totalPages = limit ? Math.ceil(totalRecords / limit) : 1
    const nextPage = page + 1 > totalPages ? null : page + 1
    const prevPage = page - 1 >= 1 ? page - 1 : null
    const hasNextPage = page < totalPages
    const hasPrevPage = prevPage !== null && prevPage >= 1

    return {
      limit,
      page,
      totalRecords,
      totalPages,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage,
    }
  }

  static async getData<Data = ObjectLiteral, Entity extends ObjectLiteral = ObjectLiteral>({
    mapper,
    limit,
    page = 1,
    serviceName,
    ...params
  }: InputGetData<Data, Entity>): Promise<Pagination<Data>> {
    try {
      this.validatePaginationParams({ limit, page })

      let rawItems: any[] = []
      let totalRecords: number = 0
      const skip = limit ? (page - 1) * limit : undefined
      const take = limit

      if (params.usingModel) {
        const { options, repository } = params

        const [items, total] = await repository.findAndCount({ ...options, skip, take })
        rawItems = items
        totalRecords = total
      }

      if (!params.usingModel) {
        const { query, connection } = params

        totalRecords = await this.getTotalRecords<Entity>({
          query,
          connection,
          serviceName,
          usingModel: false,
        })

        if (totalRecords === 0) return { items: [], pagination: { limit, page, totalRecords: 0 } }

        if (skip) query.offset(skip)
        if (take) query.limit(take)

        rawItems = await query.getRawMany()
      }

      const items = mapper ? mapper(rawItems) : (rawItems as Data[])

      const pagination = this.getPagination({ limit, page, totalRecords })
      return { items, pagination }
    } catch (error) {
      this.loggerService.error(`Error getting data`, {
        service: 'TypeormPagination',
      })
      throw error
    }
  }
}
