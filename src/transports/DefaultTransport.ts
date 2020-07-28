import { ILogTransport, ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'

export class DefaultTransport extends BaseTransport {
  constructor(params: { level: string; levelOnly: boolean }) {
    super(params)
  }

  async write(params: ILogTransportWriteParams): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const { timestamp, level, message } = params

      // get data as string
      const { dataAsString, hasData } = this.tryGetData(params)

      const outMessage = `${timestamp} ${level}: ${message}`
      if (hasData) {
        console.log(outMessage, dataAsString)
      } else {
        console.log(outMessage)
      }

      resolve(true)
    })
  }
}
