import { ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'
export declare class HtmlTransport extends BaseTransport {
  private readonly domElement
  private readonly levelStyles
  constructor(params: {
    level: string
    levelOnly: boolean
    domElement: HTMLElement
    levelStyles?: {
      [key: string]: string
    }
  })
  write(params: ILogTransportWriteParams): Promise<boolean>
}
