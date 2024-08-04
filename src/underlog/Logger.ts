import { ITimestampService } from './ITimestampService'
import { ILogTransport, ILogTransportWriteParams } from './ILogTransport'
import { DayJsTimestampService } from './timeservices'
import { DefaultTransport } from './transports'

export interface ILogger {
  canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean>

  transportsWrite(params: ILogTransportWriteParams): Promise<boolean>

  log(...args: any): void
  highlight(...args: any): void
  debug(...args: any): void
}

export interface ILoggerOptions {
  levels?: string[]
  transports?: ILogTransport[]
  timestampService?: ITimestampService
}

const defaultLevels = Object.freeze([
  'log',
  'highlight',
  'debug',
  'info',
  'warn',
  'error',
])

export class Logger implements ILogger {
  private supportedLevels!: Readonly<string[]>
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
      if (levels && levels.length > 0) {
        this.initLevels(levels)
      } else {
        this.initLevels()
      }
      if (transports && transports.length > 0) {
        this.initTransports(transports)
      } else {
        this.initTransports()
      }
      if (timestampService) {
        this.initTimestampService(timestampService)
      } else {
        this.initTimestampService()
      }
    } else {
      this.initLevels()
      this.initTransports()
      this.initTimestampService()
    }
  }

  private initLevels(levels?: string[]) {
    const customLevels = (levels || []) as string[]
    if (customLevels.length > 0) {
      this.supportedLevels = Object.freeze([...customLevels])
    } else {
      this.supportedLevels = Object.freeze([...defaultLevels])
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
    if (timestampService) {
      this.timestampService = timestampService
    } else {
      this.timestampService = new DayJsTimestampService()
    }
  }

  async canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let result = false
      const { transportLevel, transportLevelOnly } = params
      const level = (params.level || '').toString().trim().toLowerCase()

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
          const currentTransportLevelIndex =
            supportedLevels.indexOf(transportLevel)
          if (currentTransportLevelIndex > 1) {
            const previousLevels = supportedLevels.slice(
              0,
              currentTransportLevelIndex,
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

  getDefaultLevels() {
    return defaultLevels
  }

  getSupportedLevels() {
    return this.supportedLevels
  }

  log(...args: any[]) {
    let level = 'log'
    let restOfArgs: any[] = []
    if ((args || []).length > 0) {
      // level is always the first parameter
      const firstArg = (args[0] || '').toString().trim().toLowerCase()
      if (this.supportedLevels.indexOf(firstArg) > -1) {
        level = firstArg
        args.shift() // remove the first arg from args
        if (args.length > 0) {
          restOfArgs = args
        }
      } else {
        level = 'log'
        restOfArgs = args
      }
    }

    const writeParams: ILogTransportWriteParams = {
      timestamp: this.timestamp(),
      level,
      args: restOfArgs,
    }

    this.transportsWrite(writeParams).then(() => {
      // nothing to do here
    })
  }

  highlight(...args: any) {
    this.log('highlight', ...args)
  }

  debug(...args: any[]) {
    this.log('debug', ...args)
  }

  info(...args: any[]) {
    this.log('info', ...args)
  }

  warn(...args: any[]) {
    this.log('warn', ...args)
  }

  error(...args: any[]) {
    this.log('error', ...args)
  }
}
