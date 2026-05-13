import { type ILoggerService, type LogOptions } from '@domain/common/services/iLogger'
import { injectable } from 'inversify'

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
  NOTICE = 'notice',
  CRIT = 'crit',
  ALERT = 'alert',
  EMERG = 'emerg',
  TRACE = 'trace',
}

export interface Log {
  message: any
  level: LogLevel
  requestId: string
  traceId?: string
  service?: string
  namespace?: string
  duration?: number
  timestamp: Date
}

@injectable()
export abstract class LogService implements ILoggerService {
  protected readonly requestId?: string
  protected readonly traceId?: string
  protected readonly namespace?: string
  protected readonly newLoggerService: boolean
  protected readonly ctx: unknown

  constructor() {
    this.ctx = {}
    this.namespace = 'example'
    this.newLoggerService = false
    this.requestId = ''
    this.traceId = ''
  }
  public abstract error(log: any, options?: LogOptions): void
  public abstract warn(log: any, options?: LogOptions): void
  public abstract info(log: any, options?: LogOptions): void
  public abstract debug(log: any, options?: LogOptions): void
  public abstract notice(log: any, options?: LogOptions): void
  public abstract crit(log: any, options?: LogOptions): void
  public abstract alert(log: any, options?: LogOptions): void
  public abstract emerg(log: any, options?: LogOptions): void
  protected abstract log(log: any, level: LogLevel, options?: LogOptions): Log
}
