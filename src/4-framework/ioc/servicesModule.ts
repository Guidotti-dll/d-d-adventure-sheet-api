import { ContainerModule, type interfaces } from 'inversify'
// interfaces
import { type ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'
// implementations
import { ConsoleLogService } from '@domain/common/services/consoleLogService'
import { type IEncryptService, IEncryptServiceToken } from '@business/services/iEncryptService'
import { BcryptService } from '@framework/services/bcryptService'

export const ServicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(ILoggerServiceToken).to(ConsoleLogService).inRequestScope()
  bind<IEncryptService>(IEncryptServiceToken).to(BcryptService)
})
