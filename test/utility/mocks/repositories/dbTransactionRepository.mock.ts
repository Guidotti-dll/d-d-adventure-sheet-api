import {
  type IDbTransaction,
  type IDbTransactionRepository,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'

export const dbTransactionMock: jest.Mocked<IDbTransaction> = {
  commit: jest.fn().mockResolvedValue(undefined),
  rollback: jest.fn().mockResolvedValue(undefined),
}

export const dbTransactionRepositoryMock: jest.Mocked<IDbTransactionRepository> = {
  startTransaction: jest.fn().mockResolvedValue(dbTransactionMock),
}
