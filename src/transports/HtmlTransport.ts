import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../ILogTransport'
import { 
  BaseTransport 
} from './BaseTransport'

export class HtmlTransport extends BaseTransport {
  private readonly domElement!: HTMLElement
	private readonly levelStyles: { [key: string]: string } = {
    log: 'color: black',
    highlight: 'background-color: yellow; color: white',
    debug: 'color: blue',
    info: 'color: green',
    warn: 'color: orange',
    ['warn-high']: 'font-size: 20px; background: orange; color: white',
    error: 'color: red'
  }

  constructor(params: {
    level: string
    levelOnly: boolean
    domElement: HTMLElement
    levelStyles?: { [key: string]: string }
  }) {
    super(params)
    this.domElement = params.domElement
    if (params.levelStyles) {
      this.levelStyles = Object.freeze(params.levelStyles)
    }
  }

  async write(params: ILogTransportWriteParams): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.domElement || this.domElement.innerHTML === undefined) {
        reject('HtmlTransport: write: Invalid or undefined dom element')
      } else {
        const {
          timestamp,
          level,
          message
        } = params

        let outData = ''
        const includesData = this.tryGetData(params, outData)

        const formatTimstamp = `<span>${ timestamp }</span>`
        const formatMessage = `<span>${ message }</span>`
        let formatLevel = ``
        if (level !== 'log'){
          formatLevel = `<span style="${ this.levelStyles[level] }">${ level }</span>`
        } else {
          formatLevel = `<span>${ level }</span>`
        }

        let outHtml = `${ formatTimstamp } ${ formatLevel }: ${ formatMessage }`
        if (includesData){
          outHtml = `${ outHtml }: $ outData }<br/>`
        } else {
          outHtml = `${ outHtml }<br/>`
        }

        this.domElement.innerHTML += outHtml

        resolve(true)
      }
    })
  }
}
