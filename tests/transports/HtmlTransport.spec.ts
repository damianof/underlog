import { expect } from 'chai'
import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../../src/ILogTransport'
import { 
  HtmlTransport 
} from '../../src/transports/HtmlTransport'

describe('HtmlTransport.write', () => {

  const timestamp = (new Date()).toString()

  describe('write: log', () => {
    const domElement: any = {
      innerHTML: ''
    }

    const transport = new HtmlTransport({
      level: 'info',
      levelOnly: false,
      domElement: domElement
    })

    it('should return true when level is log ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'log',
        message: 'unit tests'
      })
      console.log('domElement', domElement.innerHTML)
      expect(result).to.be.true
    })

  })

  describe('write: info', () => {
    const domElement: any = {
      innerHTML: ''
    }

    const transport = new HtmlTransport({
      level: 'info',
      levelOnly: false,
      domElement: domElement
    })

    it('should return true when level is info ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'info',
        message: 'unit tests'
      })
      console.log('domElement', domElement.innerHTML)
      expect(result).to.be.true
    })

  })

  describe('write: warn', () => {
    const domElement: any = {
      innerHTML: ''
    }

    const transport = new HtmlTransport({
      level: 'error',
      levelOnly: false,
      domElement: domElement
    })

    it('should return true when level is warn ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'warn',
        message: 'unit tests'
      })
      console.log('domElement', domElement.innerHTML)
      expect(result).to.be.true
    })

  })

})
