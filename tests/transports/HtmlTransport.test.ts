import { HtmlTransport } from '../../src/underlog'

describe('HtmlTransport.write', () => {
  const timestamp = new Date().toString()

  describe('write: log', () => {
    const domElement: any = {
      innerHTML: '',
    }

    const transport = new HtmlTransport({
      level: 'info',
      levelOnly: false,
      domElement: domElement,
    })

    it('should return true when level is log ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'log',
        args: ['unit tests'],
      })
      console.log('tests: domElement', domElement.innerHTML)
      expect(result).toEqual(true)
    })
  })

  describe('write: info', () => {
    const domElement: any = {
      innerHTML: '',
    }

    const transport = new HtmlTransport({
      level: 'info',
      levelOnly: false,
      domElement: domElement,
    })

    it('should return true when level is info ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'info',
        args: ['unit tests'],
      })
      console.log('tests: domElement', domElement.innerHTML)
      expect(result).toEqual(true)
    })
  })

  describe('write: warn', () => {
    const domElement: any = {
      innerHTML: '',
    }

    const transport = new HtmlTransport({
      level: 'error',
      levelOnly: false,
      domElement: domElement,
    })

    it('should return true when level is warn ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'warn',
        args: ['unit tests arg 1', 'unit tests arg 2', 'unit tests arg 3'],
      })
      console.log('tests: domElement', domElement.innerHTML)
      expect(result).toEqual(true)
    })
  })
})
