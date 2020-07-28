import { ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'
export declare class StdErrTransport extends BaseTransport {
  private readonly prefix
  private readonly suffix
  private readonly levelStyles
  constructor(params: {
    level: string
    levelOnly: boolean
    levelStyles?: {
      [key: string]: string
    }
  })
  write(params: ILogTransportWriteParams): Promise<boolean>
}
