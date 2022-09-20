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
  tryGetData(params: ILogTransportWriteParams): {
    dataAsString: string
    dataRaw: any[]
    hasData: boolean
    message?: string
  } {
    let result = {
      dataAsString: '',
      dataRaw: [],
      hasData: false,
      message: '',
    }

    const args = params.args || []
    result.hasData = args.length > 1

    if (args.length === 1) {
      result.message = args[0]
    } else if (args.length > 1) {
      result.message = args[0]
      args.shift()
      result.dataRaw = args

      try {
        if (Array.isArray(args)) {
          result.dataAsString = args
            .map((o) => {
              if (typeof o === 'object') {
                try {
                  return JSON.stringify(o)
                } catch {
                  return o.toString()
                }
              } else {
                return o.toString()
              }
            })
            .join(': ')
        } else {
          result.dataAsString = JSON.stringify(args)
        }
        return result
      } catch {
        result.dataAsString = args.join(', ')
        return result
      }
    }

    return result
  }
}
