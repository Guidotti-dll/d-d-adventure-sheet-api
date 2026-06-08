import { type IPasswordRecoveryTokenEntity } from '@domain/entities/auth/passwordRecoveryTokenEntity'
import { type IDbTransaction } from '@business/repositories/dbTransaction/iDbTransactionRepository'

export const IPasswordRecoveryTokenRepositoryToken = Symbol.for('IPasswordRecoveryTokenRepository')

export interface IPasswordRecoveryTokenRepository {
  create(tokenEntity: IPasswordRecoveryTokenEntity, trx?: IDbTransaction): Promise<IPasswordRecoveryTokenEntity>
  findByToken(token: string): Promise<IPasswordRecoveryTokenEntity | null>
  invalidateUnusedByUserId(userId: string, trx?: IDbTransaction): Promise<void>
  markAsUsed(id: string, trx?: IDbTransaction): Promise<void>
}
