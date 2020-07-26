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

      let outData: string = ''
      const includesData = Object.keys(params).length === 4
		
      // try to stringify data if is JSON
      if (includesData && params.data){
        if (typeof params.data === 'string') {
          outData = params.data
        } else {
          try {
            outData = JSON.stringify(params.data)
          } catch {
            outData = params.data.toString()
          }
        }
      }
      
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