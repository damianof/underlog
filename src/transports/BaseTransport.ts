import { ILogTransport, ILogTransportWriteParams } from '../ILogTransport'

export abstract class BaseTransport implements ILogTransport {
  public readonly level!: string
  public readonly levelOnly!: boolean

  constructor(params: { level: string; levelOnly: boolean }) {
    this.level = Object.freeze(params.level)
    this.levelOnly = Object.freeze(params.levelOnly)
  }

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
  } {
    let result = {
      dataAsString: '',
      hasData: false,
    }

    result.hasData = Object.keys(params).length === 4

    // try to stringify data if is JSON
    if (!result.hasData) {
      return result
    } else {
      result.hasData = true

      if (typeof params.data === 'undefined') {
        result.dataAsString = 'undefined'
        return result
      }

      if (typeof params.data === 'string') {
        result.dataAsString = params.data
        return result
      }

      try {
        result.dataAsString = JSON.stringify(params.data)
        return result
      } catch {
        result.dataAsString = params.data.toString()
        return result
      }
    }
  }
}
