import { DefaultTransport } from '../../src/underlog'

describe('DefaultTransport.write', () => {
  const timestamp = new Date().toString()

  const transport = new DefaultTransport({
    level: 'info',
    levelOnly: false,
  })

  describe('write: log', () => {
    it('should return true when level is log ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'log',
        args: ['unit tests'],
      })
      expect(result).toEqual(true)
    })
  })

  describe('write: info', () => {
    it('should return true when level is info ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'info',
        args: ['unit tests'],
      })
      expect(result).toEqual(true)
    })
  })

  describe('write: error', () => {
    it('should return true when level is error ', async () => {
      const result = await transport.write({
        timestamp: timestamp,
        level: 'error',
        args: ['unit tests arg 1', 'unit tests arg 2', 'unit tests arg 3'],
      })
      expect(result).toEqual(true)
    })
  })
})
