import { ContainerModule, type interfaces } from 'inversify'
import { PasswordRecoveryTokenModel } from '@framework/models/auth/passwordRecoveryTokenModel'
import { UserModel } from '@framework/models/users/userModel'
import { type DataSource, type Repository } from 'typeorm'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Repository<UserModel>>('UserModel').toDynamicValue(async context => {
    const conn = await context.container.getAsync<DataSource>('typeorm')
    return conn.getRepository(UserModel)
  })

  bind<Repository<PasswordRecoveryTokenModel>>('PasswordRecoveryTokenModel').toDynamicValue(async context => {
    const conn = await context.container.getAsync<DataSource>('typeorm')
    return conn.getRepository(PasswordRecoveryTokenModel)
  })
})
