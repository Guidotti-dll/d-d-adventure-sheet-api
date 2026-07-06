import { ContainerModule, type interfaces } from 'inversify'
import { LoginUseCase } from '@business/useCases/auth/loginUseCase'
import { RequestPasswordRecoveryUseCase } from '@business/useCases/auth/requestPasswordRecoveryUseCase'
import { ResetPasswordUseCase } from '@business/useCases/auth/resetPasswordUseCase'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { DeleteUserUseCase } from '@business/useCases/users/deleteUserUseCase'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'
import { CreateCampaignUseCase } from '@business/useCases/campaigns/createCampaignUseCase'
import { ListCampaignsUseCase } from '@business/useCases/campaigns/listCampaignsUseCase'
import { FindCampaignUseCase } from '@business/useCases/campaigns/findCampaignUseCase'
import { UpdateCampaignUseCase } from '@business/useCases/campaigns/updateCampaignUseCase'
import { DeleteCampaignUseCase } from '@business/useCases/campaigns/deleteCampaignUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(LoginUseCase).toSelf()
  bind(RequestPasswordRecoveryUseCase).toSelf()
  bind(ResetPasswordUseCase).toSelf()
  bind(CreateUserUseCase).toSelf()
  bind(DeleteUserUseCase).toSelf()
  bind(FindUserUseCase).toSelf()
  bind(ListUsersUseCase).toSelf()
  bind(UpdateUserUseCase).toSelf()
  bind(CreateCampaignUseCase).toSelf()
  bind(ListCampaignsUseCase).toSelf()
  bind(FindCampaignUseCase).toSelf()
  bind(UpdateCampaignUseCase).toSelf()
  bind(DeleteCampaignUseCase).toSelf()
})
