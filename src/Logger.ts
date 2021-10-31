import { ITimestampService } from './ITimestampService'
import { ILogTransport, ILogTransportWriteParams } from './ILogTransport'
import { MomentTimestampService } from './timeservices'
import { DefaultTransport } from './transports'

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

export class Logger implements ILogger {
  private supportedLevels!: string[]
  private transports!: ILogTransport[]
  private timestampService!: ITimestampService

  private timestamp(): string {
    if (this.timestampService) {
      return this.timestampService.getTimestamp()
    }
    return new Date().toString()
  }

  constructor(options?: ILoggerOptions) {
    if (options) {
      const { levels, transports, timestampService } = options

      this.initLevels(levels)
      this.initTransports(transports)
      this.initTimestampService(timestampService)
    } else {
      this.initLevels()
      this.initTransports()
      this.initTimestampService()
    }
  }

  private initLevels(levels?: string[]) {
    const defaultLevels = ['highlight', 'debug']
    if ((levels || []).length > 0) {
      this.supportedLevels = [...defaultLevels, ...(<string[]>levels)]
    } else {
      this.supportedLevels = defaultLevels
    }
  }

  private initTransports(transports?: ILogTransport[]) {
    if ((transports || []).length > 0) {
      this.transports = <ILogTransport[]>transports
    } else {
      this.transports = [
        new DefaultTransport({
          level: 'error',
          levelOnly: false,
        }),
      ]
    }
  }

  private initTimestampService(timestampService?: ITimestampService) {
    if (timestampService && timestampService.getTimestamp) {
      this.timestampService = timestampService
    } else {
      this.timestampService = new MomentTimestampService()
    }
  }

  async canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let result = false
      const { transportLevel, transportLevelOnly, level } = params

      if (transportLevelOnly) {
        // log only the level specified in transportLevel
        result = transportLevel === level
      } else {
        // log from level specified in transport level and higher
        // 'highlight' and 'log' always proceed
        if (
          transportLevel === level ||
          ['log', 'highlight'].indexOf(level) > -1
        ) {
          result = true
        } else {
          // if level is not 'log', 'highlight', or 'error', we can proceed
          // as long as level is one of the previous levels before transportLevel value
          const supportedLevels = this.supportedLevels
          const currentTransportLevelIndex = supportedLevels.indexOf(
            transportLevel
          )
          if (currentTransportLevelIndex > 1) {
            const previousLevels = supportedLevels.slice(
              0,
              currentTransportLevelIndex
            )
            result = previousLevels.includes(level)
          }
        }
      }

      resolve(result)
    })
  }

  async transportsWrite(params: ILogTransportWriteParams): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.transports.forEach(async (transport) => {
        const canProceeed = await this.canProceed({
          transportLevel: transport.level,
          transportLevelOnly: transport.levelOnly,
          level: params.level,
        })
        if (canProceeed) {
          const result = await transport.write(params)
          resolve(result)
        }
      })
    })
  }

  log(level: string, message: string, data?: any): void {
    const writeParams: any = {
      timestamp: this.timestamp(),
      level: level,
      message: message,
    }

    if (arguments.length > 2) {
      writeParams.data = data
    }

    this.transportsWrite(writeParams).then(() => {
      // nothing to do here
    })
  }

  private logByCheckingData(args: any) {
    if (args.length > 2) {
      this.log(args[0], args[1], args[2])
    } else {
      this.log(args[0], args[1])
    }
  }

  highlight(message: string, data?: any) {
    this.logByCheckingData(['highlight', ...arguments])
  }

  debug(message: string, data?: any) {
    this.logByCheckingData(['debug', ...arguments])
  }

  info(message: string, data?: any): void {
    this.logByCheckingData(['info', ...arguments])
  }

  warn(message: string, data?: any): void {
    this.logByCheckingData(['warn', ...arguments])
  }

  error(message: string, data?: any): void {
    this.logByCheckingData(['error', ...arguments])
  }
}
