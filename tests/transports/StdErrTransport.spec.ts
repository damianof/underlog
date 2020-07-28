import { expect } from 'chai'
import {
  ILogTransport,
  ILogTransportWriteParams,
} from '../../src/ILogTransport'
import { StdErrTransport } from '../../src/transports/StdErrTransport'

describe('StdErrTransport.write', () => {
  const timestamp = new Date().toString()

  const transport = new StdErrTransport({
    level: 'info',
    levelOnly: false,
    levelStyles: undefined,
  })

  describe('write: log', () => {
    it('should return true when level is log ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'log',
        message: 'unit tests',
      })
      expect(result).to.be.true
    })
  })

  describe('write: error', () => {
    it('should return true when level is info ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'info',
        message: 'unit tests',
      })
      expect(result).to.be.true
    })

    it('should return true when level is warn ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'warn',
        message: 'unit tests',
      })
      expect(result).to.be.true
    })

    it('should return true when level is warn-high ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'warn-high',
        message: 'unit tests',
      })
      expect(result).to.be.true
    })

    it('should return true when level is error ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'error',
        message: 'unit tests',
      })
      expect(result).to.be.true
    })
  })
})
