import { expect } from 'chai'
import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '../../src/ILogTransport'
import { 
  DefaultTransport 
} from '../../src/transports/DefaultTransport'

describe('DefaultTransport.write', () => {

  const timestamp = (new Date()).toString()

	const transport = new DefaultTransport({
    level: 'info',
    levelOnly: false
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
