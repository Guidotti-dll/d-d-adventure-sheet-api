import { ContainerModule, type interfaces } from 'inversify'
import { LoginOperator } from '@controller/operations/auth/loginOperator'
import { RequestPasswordRecoveryOperator } from '@controller/operations/auth/requestPasswordRecoveryOperator'
import { ResetPasswordOperator } from '@controller/operations/auth/resetPasswordOperator'
import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { DeleteUserOperator } from '@controller/operations/users/deleteUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { ListUsersOperator } from '@controller/operations/users/listUsersOperator'
import { UpdateUserOperator } from '@controller/operations/users/updateUserOperator'
import { CreateCampaignOperator } from '@controller/operations/campaign/createCampaignOperator'
import { DeleteCampaignOperator } from '@controller/operations/campaign/deleteCampaignOperator'
import { FindCampaignOperator } from '@controller/operations/campaign/findCampaignOperator'
import { ListCampaignsOperator } from '@controller/operations/campaign/listCampaignsOperator'
import { UpdateCampaignOperator } from '@controller/operations/campaign/updateCampaignOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(LoginOperator).toSelf()
  bind(RequestPasswordRecoveryOperator).toSelf()
  bind(ResetPasswordOperator).toSelf()
  bind(CreateUserOperator).toSelf()
  bind(DeleteUserOperator).toSelf()
  bind(FindUserOperator).toSelf()
  bind(ListUsersOperator).toSelf()
  bind(UpdateUserOperator).toSelf()
  bind(CreateCampaignOperator).toSelf()
  bind(DeleteCampaignOperator).toSelf()
  bind(FindCampaignOperator).toSelf()
  bind(ListCampaignsOperator).toSelf()
  bind(UpdateCampaignOperator).toSelf()
})
