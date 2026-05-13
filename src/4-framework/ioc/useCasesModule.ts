import { ContainerModule, type interfaces } from 'inversify'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase)
  bind(FindUserUseCase).to(FindUserUseCase)
})
