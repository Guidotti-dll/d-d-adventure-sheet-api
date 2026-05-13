export const ILoggerServiceToken = Symbol.for('ILoggerService')

export interface LogOptions {
  service?: string
  duration?: number
}
export interface ILoggerService {
  error(log: any, options?: LogOptions): void
  warn(log: any, options?: LogOptions): void
  info(log: any, options?: LogOptions): void
  debug(log: any, options?: LogOptions): void
  notice(log: any, options?: LogOptions): void
  crit(log: any, options?: LogOptions): void
  alert(log: any, options?: LogOptions): void
  emerg(log: any, options?: LogOptions): void
}
