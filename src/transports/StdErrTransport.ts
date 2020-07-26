import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../ILogTransport'
import { 
  BaseTransport 
} from './BaseTransport'

export class StdErrTransport extends BaseTransport {
  private readonly prefix: string = Object.freeze('\x1b[')
  private readonly suffix: string = Object.freeze('\x1b[0;37m')
  private readonly levelStyles: { [key: string]: string } = {
    log: '37m',
		highlight: '7;33m', // yellow background
    debug: '34m', // blue
		info: '7;33m', //'32m', // green
		warn: '33m', // yellow
    ['warn-high']: '35m',
		error: '31m' // red
	}

  constructor(params: {
    level: string
    levelOnly: boolean
    levelStyles?: { [key: string]: string }
  }) {
    super(params)
    if (params.levelStyles) {
      this.levelStyles = Object.freeze(params.levelStyles)
    }
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

      const outMessage = `${ timestamp } ${ this.prefix }${ this.levelStyles[level] }${ level }${ this.suffix }: ${ message }`
      if (includesData){
        console.log(outMessage, outData)
      } else {
        console.log(outMessage,)
      }

      resolve(true)
    })
  }
}
