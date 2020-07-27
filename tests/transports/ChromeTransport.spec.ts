import { expect } from 'chai'
import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../../src/ILogTransport'
import { 
  ChromeTransport 
} from '../../src/transports/ChromeTransport'
import { JSDOM } from 'jsdom'

describe('ChromeTransport.write', () => {

  const timestamp = (new Date()).toString()

	const transport = new ChromeTransport({
    level: 'info',
    levelOnly: false,
    levelStyles: undefined
	})

  before(() => {
    global.window = new JSDOM('') as any
    global.navigator = {
      userAgent: 'chrome'
    } as any
  }) 

	describe('write: log', () => {

		it('should return true when level is log ', async () => {
			const result = await transport.write({
        timestamp: timestamp,
        level: 'log',
        message: 'unit tests'
			})
			expect(result).to.be.true
		})

  })

  describe('write: info', () => {

		it('should return true when level is info ', async () => {
			const result = await transport.write({
        timestamp: timestamp,
        level: 'info',
        message: 'unit tests'
			})
			expect(result).to.be.true
		})

  })
  
})
