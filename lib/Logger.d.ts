import { ITimestampService } from './ITimestampService'
import { ILogTransport, ILogTransportWriteParams } from './ILogTransport'
export interface ILogger {
  canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean>
  transportsWrite(params: ILogTransportWriteParams): Promise<boolean>
  log(level: string, message: string, data?: any): void
  highlight(message: string, data?: any): void
  debug(message: string, data?: any): void
}
export interface ILoggerOptions {
  levels?: string[]
  transports?: ILogTransport[]
  timestampService?: ITimestampService
}
export declare class Logger implements ILogger {
  private supportedLevels
  private transports
  private timestampService
  private timestamp
  constructor(options?: ILoggerOptions)
  private initLevels
  private initTransports
  private initTimestampService
  canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean>
  transportsWrite(params: ILogTransportWriteParams): Promise<boolean>
  log(level: string, message: string, data?: any): void
  private logByCheckingData
  highlight(message: string, data?: any): void
  debug(message: string, data?: any): void
  info(message: string, data?: any): void
  warn(message: string, data?: any): void
  error(message: string, data?: any): void
}
