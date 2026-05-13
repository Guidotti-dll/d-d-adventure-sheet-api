export const IDbTransactionRepositoryToken = Symbol.for('IDbTransactionRepository')

export interface IDbTransaction {
  commit(): Promise<void>
  rollback(): Promise<void>
}

export interface IDbTransactionRepository {
  startTransaction(): Promise<IDbTransaction>
}
