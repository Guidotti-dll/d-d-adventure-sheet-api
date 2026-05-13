import { type LogOptions } from '@domain/common/services/iLogger'
import { injectable } from 'inversify'
import { type Log, LogLevel, LogService } from '@domain/common/services/logService'
import { jsonReplacer } from '@domain/common/utility/utils/jsonReplacer'

interface Trace {
  name: string
  details: string
  duration: number
  requestId: string
  traceId?: string
  service?: string
  data?: any
}

@injectable()
export class ConsoleLogService extends LogService {
  private defineLabel(logLevel: LogLevel, service?: string, traceName?: string, traceDuration?: number): string {
    const namespaceLabel = this.namespace ? `[${this.namespace}]` : ''
    const serviceLabel = service ? `[${service}]` : ''
    const logLevelLabel = logLevel ? `[${logLevel}]` : ''

    let label = `${namespaceLabel} ${serviceLabel} ${logLevelLabel}`

    if (logLevel === LogLevel.TRACE) {
      const traceNameLabel = traceName ? `[${traceName}]` : ''
      const traceDurationLabel = traceDuration ? `[${traceDuration}ms]` : ''
      label += ` ${traceNameLabel} ${traceDurationLabel}`
    }

    return `${label}:`
  }

  protected log(message: any, level: LogLevel = LogLevel.INFO, options?: LogOptions): Log {
    const StructuredLog: Log = {
      message,
      service: options?.service,
      requestId: this.requestId ?? '',
      traceId: this.traceId,
      level,
      namespace: this.namespace,
      duration: options?.duration,
      timestamp: new Date(),
    }

    const log = this.newLoggerService ? StructuredLog : message

    const logMessage = `${this.defineLabel(level, options?.service)} ${JSON.stringify(log, jsonReplacer(), 2)}`

    switch (level) {
      case LogLevel.ERROR:
        console.error(logMessage)
        break
      case LogLevel.WARN:
        console.warn(logMessage)
        break
      case LogLevel.INFO:
        console.info(logMessage)
        break
      default:
        console.log(logMessage)
        break
    }
    return log
  }

  public error(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.ERROR, options)
  }

  public warn(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.WARN, options)
  }

  public info(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.INFO, options)
  }

  public debug(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.DEBUG, options)
  }

  public notice(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.NOTICE, options)
  }

  public crit(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.CRIT, options)
  }

  public alert(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.ALERT, options)
  }

  public emerg(log: any, options?: LogOptions): void {
    this.log(log, LogLevel.EMERG, options)
  }

  protected trace(name: string, data: any, options?: LogOptions): Trace {
    const trace: Trace = {
      name,
      details: `${name} took ${options?.duration ?? 0}ms`,
      duration: options?.duration ?? 0,
      service: options?.service,
      requestId: this.requestId ?? '',
      traceId: this.traceId ?? this.requestId,
      data,
    }

    const logMessage = `${this.defineLabel(LogLevel.TRACE, options?.service, name, options?.duration)} ${JSON.stringify(
      trace,
      jsonReplacer(),
      2
    )}`

    console.log(logMessage)

    return trace
  }
}
