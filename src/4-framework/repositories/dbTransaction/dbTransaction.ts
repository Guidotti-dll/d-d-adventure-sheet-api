import { type IDbTransaction } from '@business/repositories/dbTransaction/iDbTransactionRepository'
import {
  type EntityTarget,
  type ObjectLiteral,
  type QueryRunner,
  type Repository,
  type SelectQueryBuilder,
} from 'typeorm'

export class DbTransaction implements IDbTransaction {
  private queryRunner: QueryRunner
  private isActive = true
  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner
  }

  async commit(): Promise<void> {
    if (!this.isActive) {
      console.log('Transaction already finished')
      return
    }
    await this.queryRunner.commitTransaction()
    await this.finish()
  }

  async rollback(): Promise<void> {
    if (!this.isActive) {
      console.log('Transaction already finished')
      return
    }

    await this.queryRunner.rollbackTransaction()
    await this.finish()
  }

  async save<M>(model: M): Promise<M> {
    return this.queryRunner.manager.save(model)
  }

  async update<M extends EntityTarget<ObjectLiteral>, E>(
    model: M,
    condition: Partial<E>,
    fieldsToUpdate: Partial<E>
  ): Promise<void> {
    await this.queryRunner.manager.update(model, condition, fieldsToUpdate)
  }

  async queryBuilder<M extends ObjectLiteral>(model: EntityTarget<M>, alias?: string): Promise<SelectQueryBuilder<M>> {
    return this.queryRunner.manager.getRepository(model).createQueryBuilder(alias)
  }

  async getRepository<M extends ObjectLiteral>(model: EntityTarget<M>): Promise<Repository<M>> {
    return this.queryRunner.manager.getRepository(model)
  }

  private async finish(): Promise<void> {
    this.isActive = false
    return this.queryRunner.release()
  }
}
