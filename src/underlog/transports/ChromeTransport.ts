import { ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'

export class ChromeTransport extends BaseTransport {
  private readonly prefix: string = Object.freeze('%c ')
  private readonly levelStyles: { [key: string]: string } = {
    log: 'background: blue; color: white',
    highlight: 'background: yellow;',
    debug: 'background: blue; color: white',
    info: 'background: green; color: white',
    warn: 'background: orange; color: white',
    ['warn-high']: 'font-size: 20px; background: orange; color: white',
    error: 'background: red; color: white',
  }

  constructor(params: {
    level: string
    levelOnly: boolean
    levelStyles?: { [key: string]: string }
  }) {
    super(params)
    if (params.levelStyles) {
      this.levelStyles = Object.freeze(params.levelStyles)
    }
  }

  async write(params: ILogTransportWriteParams): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const { timestamp, level } = params

      // get data as string
      const { dataAsString, hasData } = this.tryGetData(params)

      let isChrome = false
      if (navigator) {
        isChrome = /chrome/gi.test(navigator.userAgent)
      }

      if (level !== 'log' && isChrome) {
        const outMessage = `${timestamp}${this.prefix + level}`.trim()
        if (hasData) {
          console.log(`${outMessage}:`, this.levelStyles[level], dataAsString)
        } else {
          console.log(`${outMessage}:`, this.levelStyles[level])
        }
      } else {
        const outMessage = `${timestamp} ${level}`.trim()
        if (hasData) {
          console.log(`${outMessage}:`, dataAsString)
        } else {
          console.log(outMessage)
        }
      }

      resolve(true)
    })
  }
}
