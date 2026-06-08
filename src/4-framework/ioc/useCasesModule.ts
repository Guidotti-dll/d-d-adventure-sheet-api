import { ContainerModule, type interfaces } from 'inversify'
import { LoginUseCase } from '@business/useCases/auth/loginUseCase'
import { RequestPasswordRecoveryUseCase } from '@business/useCases/auth/requestPasswordRecoveryUseCase'
import { ResetPasswordUseCase } from '@business/useCases/auth/resetPasswordUseCase'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { DeleteUserUseCase } from '@business/useCases/users/deleteUserUseCase'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(LoginUseCase).toSelf()
  bind(RequestPasswordRecoveryUseCase).toSelf()
  bind(ResetPasswordUseCase).toSelf()
  bind(CreateUserUseCase).toSelf()
  bind(DeleteUserUseCase).toSelf()
  bind(FindUserUseCase).toSelf()
  bind(ListUsersUseCase).toSelf()
  bind(UpdateUserUseCase).toSelf()
})
