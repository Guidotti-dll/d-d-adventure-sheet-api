import { type IUserEntity } from '@domain/entities/users/userEntity'
import { type IDbTransaction } from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { type Pagination } from '@domain/common/dtos/paginationDto'

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity, trx?: IDbTransaction): Promise<IUserEntity>
  update(userEntity: IUserEntity, trx?: IDbTransaction): Promise<IUserEntity>
  findUserById(userId: number): Promise<IUserEntity | null>
  listBy(): Promise<Pagination<IUserEntity>>
}
