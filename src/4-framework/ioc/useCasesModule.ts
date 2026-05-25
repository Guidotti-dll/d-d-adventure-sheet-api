import { ContainerModule, type interfaces } from 'inversify'
import { LoginUseCase } from '@business/useCases/auth/loginUseCase'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(LoginUseCase).toSelf()
  bind(CreateUserUseCase).toSelf()
  bind(FindUserUseCase).toSelf()
})
