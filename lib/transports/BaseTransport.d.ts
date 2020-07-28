import { ILogTransport, ILogTransportWriteParams } from '../ILogTransport'
export declare abstract class BaseTransport implements ILogTransport {
  readonly level: string
  readonly levelOnly: boolean
  constructor(params: { level: string; levelOnly: boolean })
  /**
   * @name write
   * @description Must override in inheriting class
   * @param params
   */
  abstract write(params: ILogTransportWriteParams): Promise<boolean>
  /**
   * @name tryGetData
   * @description
   * Tries to parse the params.data to string if it was passed (even as undefined)
   * If it was passed, we still ahve to log it as 'undefined',
   * unless it was not passed at all in which case we do not want to log it.
   */
  tryGetData(
    params: ILogTransportWriteParams
  ): {
    dataAsString: string
    hasData: boolean
  }
}
