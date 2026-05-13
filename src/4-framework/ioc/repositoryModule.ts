import { ContainerModule, type interfaces } from 'inversify'
import { IUserRepositoryToken, type IUserRepository } from '@business/repositories/users/iUserRepository'
import { UserRepository } from '@framework/repositories/users/userRepository'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { DbTransactionRepository } from '@framework/repositories/dbTransaction/dbTransactionRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
  bind<IDbTransactionRepository>(IDbTransactionRepositoryToken).to(DbTransactionRepository)
})
