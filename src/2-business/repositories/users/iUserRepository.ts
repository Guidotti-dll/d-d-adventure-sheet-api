import { type IUserEntity } from '@domain/entities/users/userEntity'
import { type IDbTransaction } from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { type Pagination } from '@domain/common/dtos/paginationDto'

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface InputListUsersParams {
  name?: string
  email?: string
  page?: number
  limit?: number
}

export interface IUserRepository {
  create(userEntity: IUserEntity, trx?: IDbTransaction): Promise<IUserEntity>
  update(userEntity: IUserEntity, trx?: IDbTransaction): Promise<IUserEntity>
  delete(userId: string, trx?: IDbTransaction): Promise<void>
  findUserById(userId: string): Promise<IUserEntity | null>
  findUserByEmail(email: string): Promise<IUserEntity | null>
  listBy(params: InputListUsersParams): Promise<Pagination<IUserEntity>>
}
