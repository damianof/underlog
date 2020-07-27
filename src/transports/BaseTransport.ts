import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../ILogTransport'

export abstract class BaseTransport implements ILogTransport {
  public readonly level!: string
  public readonly levelOnly!: boolean
  
  constructor(params: {
    level: string
    levelOnly: boolean
  }) {
    this.level = Object.freeze(params.level)
    this.levelOnly = Object.freeze(params.levelOnly)
  }
  
  /**
   * @name write
   * @description Must override in inheriting class
   * @param params 
   */
  abstract write(params: ILogTransportWriteParams): Promise<boolean>

  tryGetData(params: ILogTransportWriteParams, outData: string): boolean {
    outData = ''
    const includesData = Object.keys(params).length === 4
		
    // try to stringify data if is JSON
    if (includesData){
      if (!params.data) {
        outData = 'undefined'
        return true
      }

      if (typeof params.data === 'string') {
        outData = params.data
        return true
      }

      try {
        outData = JSON.stringify(params.data)
        return true
      } catch {
        outData = params.data.toString()
        return true
      }
    } else {
      return false
    }
  }
}
