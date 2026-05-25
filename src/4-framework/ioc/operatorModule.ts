import { ContainerModule, type interfaces } from 'inversify'
import { LoginOperator } from '@controller/operations/auth/loginOperator'
import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(LoginOperator).toSelf()
  bind(CreateUserOperator).toSelf()
  bind(FindUserOperator).toSelf()
})
