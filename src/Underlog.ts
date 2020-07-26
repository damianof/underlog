import { ILogTransport, ILogTransportWriteParams } from './ILogTransport'

export interface IUnderLog {
  canProceed(params: {
    transportLevel: string
    transportLevelOnly: boolean
    level: string
  }): Promise<boolean>

  transportsWrite(params: ILogTransportWriteParams): Promise<boolean>
}

export interface IUnderLogOptions {
  levels: string[]
  transports: ILogTransport[]
}

export class UnderLog implements IUnderLog {
  private supportedLevels!: string[]
  private transports!: ILogTransport[]
  private get timestamp(): Date {
    return new Date()
  }

  constructor(options: IUnderLogOptions) {
    const {
      levels,
      transports
    } = options

    const defaultLevels = ['highlight', 'debug']
    if ((levels || []).length > 0) {
      this.supportedLevels = [...defaultLevels, ...levels]
    } else {
      this.supportedLevels = defaultLevels
    }
    console.log('UnderLog supportedLevels', this.supportedLevels)

    this.transports = transports
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
            //console.log(`transportLevel: ${transportLevel} level: ${ level } currentTransportLevelIndex: ${ currentTransportLevelIndex } previousLevels`, previousLevels)
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

}
