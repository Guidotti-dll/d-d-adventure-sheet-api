import { ContainerModule, type interfaces } from 'inversify'
import { LoginOperator } from '@controller/operations/auth/loginOperator'
import { RequestPasswordRecoveryOperator } from '@controller/operations/auth/requestPasswordRecoveryOperator'
import { ResetPasswordOperator } from '@controller/operations/auth/resetPasswordOperator'
import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { DeleteUserOperator } from '@controller/operations/users/deleteUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { ListUsersOperator } from '@controller/operations/users/listUsersOperator'
import { UpdateUserOperator } from '@controller/operations/users/updateUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(LoginOperator).toSelf()
  bind(RequestPasswordRecoveryOperator).toSelf()
  bind(ResetPasswordOperator).toSelf()
  bind(CreateUserOperator).toSelf()
  bind(DeleteUserOperator).toSelf()
  bind(FindUserOperator).toSelf()
  bind(ListUsersOperator).toSelf()
  bind(UpdateUserOperator).toSelf()
})
