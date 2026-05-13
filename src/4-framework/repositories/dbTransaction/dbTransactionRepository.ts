import { injectable, inject } from 'inversify'
import { DataSource } from 'typeorm'
import {
  type IDbTransaction,
  type IDbTransactionRepository,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { DbTransaction } from '@framework/repositories/dbTransaction/dbTransaction'

@injectable()
export class DbTransactionRepository implements IDbTransactionRepository {
  public constructor(@inject('typeorm') private connection: DataSource) {}

  async startTransaction(): Promise<IDbTransaction> {
    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    return new DbTransaction(queryRunner)
  }
}
