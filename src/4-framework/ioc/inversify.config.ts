import { container } from '@shared/ioc/container'
import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operatorModule'
import { ModelsModule } from './modelsModule'
import { AppDataSource } from '@framework/database/typeorm'
import { UseCasesModule } from './useCasesModule'
import { ServicesModule } from './servicesModule'
import { type DataSource } from 'typeorm'

container
  .bind<DataSource>('typeorm')
  .toDynamicValue(async () => {
    if (AppDataSource.isInitialized) return AppDataSource
    return AppDataSource.initialize()
  })
  .inSingletonScope()
container.load(ModelsModule)
container.load(RepositoryModule)
container.load(UseCasesModule)
container.load(OperatorModule)
container.load(ServicesModule)
