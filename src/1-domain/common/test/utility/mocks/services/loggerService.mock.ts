import 'reflect-metadata'
import { type Container } from 'inversify'
import { type ILoggerService, ILoggerServiceToken } from '@domain/common/services/iLogger'

const fakeLoggerService: jest.Mocked<ILoggerService> = {
  error: jest.fn().mockResolvedValue(null),
  warn: jest.fn().mockResolvedValue(null),
  info: jest.fn().mockResolvedValue(null),
  debug: jest.fn().mockResolvedValue(null),
  notice: jest.fn().mockResolvedValue(null),
  crit: jest.fn().mockResolvedValue(null),
  alert: jest.fn().mockResolvedValue(null),
  emerg: jest.fn().mockResolvedValue(null),
}

export function mockLoggerService(container: Container): void {
  container.bind<ILoggerService>(ILoggerServiceToken).toConstantValue(fakeLoggerService)
}
