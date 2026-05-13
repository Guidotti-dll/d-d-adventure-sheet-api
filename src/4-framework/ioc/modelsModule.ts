import { ContainerModule, type interfaces } from 'inversify'
import { UserModel } from '@framework/models/users/userModel'
import { type DataSource, type Repository } from 'typeorm'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Repository<UserModel>>('UserModel').toDynamicValue(async context => {
    const conn = await context.container.getAsync<DataSource>('typeorm')
    return conn.getRepository(UserModel)
  })
})
