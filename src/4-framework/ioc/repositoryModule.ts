import { ContainerModule, type interfaces } from 'inversify'
import {
  IPasswordRecoveryTokenRepositoryToken,
  type IPasswordRecoveryTokenRepository,
} from '@business/repositories/auth/iPasswordRecoveryTokenRepository'
import { IUserRepositoryToken, type IUserRepository } from '@business/repositories/users/iUserRepository'
import { ICampaignRepositoryToken, type ICampaignRepository } from '@business/repositories/campaign/iCampaignRepository'
import { PasswordRecoveryTokenRepository } from '@framework/repositories/auth/passwordRecoveryTokenRepository'
import { UserRepository } from '@framework/repositories/users/userRepository'
import { CampaignRepository } from '@framework/repositories/campaign/campaignRepository'
import {
  type IDbTransactionRepository,
  IDbTransactionRepositoryToken,
} from '@business/repositories/dbTransaction/iDbTransactionRepository'
import { DbTransactionRepository } from '@framework/repositories/dbTransaction/dbTransactionRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IPasswordRecoveryTokenRepository>(IPasswordRecoveryTokenRepositoryToken).to(PasswordRecoveryTokenRepository)
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
  bind<ICampaignRepository>(ICampaignRepositoryToken).to(CampaignRepository)
  bind<IDbTransactionRepository>(IDbTransactionRepositoryToken).to(DbTransactionRepository)
})
