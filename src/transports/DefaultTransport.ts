import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../ILogTransport'
import { 
  BaseTransport 
} from './BaseTransport'

export class DefaultTransport extends BaseTransport {
  
  constructor(params: {
    level: string
    levelOnly: boolean
  }) {
    super(params)
  }

  async write(params: ILogTransportWriteParams): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const {
        timestamp,
        level,
        message
      } = params

      let outData = ''
      const includesData = this.tryGetData(params, outData)
      
      const outMessage = `${ timestamp } ${ level }: ${ message }`
      if (includesData){
        console.log(outMessage, outData)
      } else {
        console.log(outMessage)
      }

      resolve(true)
    })
  }
}
