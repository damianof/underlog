import { ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'

export class StdErrTransport extends BaseTransport {
  private readonly prefix: string = Object.freeze('\x1b[')
  private readonly suffix: string = Object.freeze('\x1b[0;37m')
  private readonly levelStyles: { [key: string]: string } = {
    log: '0;1;37m', // white, bold
    highlight: '7;1;36m', // cyan background, bold
    debug: '0;1;34m', // blue, bold
    info: '0;1;32m', // green, bold
    warn: '0;1;33m', // yellow, bold
    ['warn-high']: '0;1;35m', // purple, bold
    error: '0;1;31m', // red, bold
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
      const outMessage = `${timestamp} ${this.prefix}${this.levelStyles[level]}${level}${this.suffix}:`
      const args = params.args || []
      if (args.length > 0) {
        console.log(`${outMessage}:`, ...args)
      } else {
        console.log(outMessage)
      }
      resolve(true)
    })
  }
}
