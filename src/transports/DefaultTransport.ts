import { ILogTransport, ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'

export class DefaultTransport extends BaseTransport {
  constructor(params: { level: string; levelOnly: boolean }) {
    super(params)
  }

  async write(params: ILogTransportWriteParams): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const { timestamp, level, args } = params
      const outMessage = `${timestamp} ${level}`

      if (args) {
        console.log(`${outMessage}:`, ...args)
      } else {
        console.log(outMessage)
      }

      resolve(true)
    })
  }
}
