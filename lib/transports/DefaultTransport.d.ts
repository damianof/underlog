import { ILogTransportWriteParams } from '../ILogTransport'
import { BaseTransport } from './BaseTransport'
export declare class DefaultTransport extends BaseTransport {
  constructor(params: { level: string; levelOnly: boolean })
  write(params: ILogTransportWriteParams): Promise<boolean>
}
