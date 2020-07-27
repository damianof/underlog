import { ITimestampService } from './ITimestampService'
import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from './ILogTransport'
import {
  MomentTimestampService
} from './timeservices/MomentTimestampService'
import {
  DefaultTransport
} from './transports/DefaultTransport'

export interface IUnderLog {
  canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean>

  transportsWrite(params: ILogTransportWriteParams,): Promise<boolean>

  log(level: string, message: string, data?: any): void
  highlight(message: string, data?: any): void
  debug(message: string, data?: any): void
}

export interface IUnderLogOptions {
  levels?: string[] 
  transports?: ILogTransport[] 
  timestampService?: ITimestampService 
}

export class UnderLog implements IUnderLog {
  private supportedLevels!: string[]
  private transports!: ILogTransport[]
  private timestampService!: ITimestampService

  private get timestamp(): string {
    if (this.timestampService) {
      return this.timestampService.getTimestamp()
    }
    return (new Date()).toString()
  }

  constructor(options: IUnderLogOptions) {
    const {
      levels,
      transports,
      timestampService
    } = options

    const defaultLevels = ['highlight', 'debug']
    if ((levels || []).length > 0) {
      this.supportedLevels = [...defaultLevels, ...(<string[]>levels)]
    } else {
      this.supportedLevels = defaultLevels
    }

    if ((transports || []).length > 0) {
      this.transports = <ILogTransport[]>transports
    } else {
      this.transports = [
        new DefaultTransport({
          level: 'error',
          levelOnly: false
        })
      ]
    }

    if (timestampService) {
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
      const {
        transportLevel,
        transportLevelOnly,
        level
      } = params

      if (transportLevelOnly) {
        // log only the level specified in transportLevel
        result = (transportLevel === level)
      } else {
        // log from level specified in transport level and higher
        // 'highlight' and 'log' always proceed
        if (transportLevel === level || ['log', 'highlight'].indexOf(level) > -1) {
          result = true
        } else {
          // if level is not 'log', 'highlight', or 'error', we can proceed
          // as long as level is one of the previous levels before transportLevel value
          const supportedLevels = this.supportedLevels
          const currentTransportLevelIndex = supportedLevels.indexOf(transportLevel)
          if (currentTransportLevelIndex > 1) {
            const previousLevels = supportedLevels.slice(0, currentTransportLevelIndex)
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
        if (this.canProceed({
          transportLevel: transport.level,
          transportLevelOnly: transport.levelOnly,
          level: params.level
        })){
          const result = await transport.write(params)
          resolve(result)
        }
      })
    })
  }

  log(level: string, message: string, data?: any): void {
    const writeParams: any = {
      timestamp: this.timestamp,
      level: level,
      message: message
    }

    if (arguments.length > 2) {
      writeParams.data = data
    }

    this.transportsWrite(writeParams).then(() => {
      // nothing to do here
    })
  }

  highlight(message: string, data?: any): void {
    const level = 'highlight'
    if (arguments.length > 1) {
      this.log(level, message, data)
    } else {
      this.log(level, message)
    }
  }

  debug(message: string, data?: any): void {
    const level = 'debug'
    if (arguments.length > 1) {
      this.log(level, message, data)
    } else {
      this.log(level, message)
    }
  }

}
