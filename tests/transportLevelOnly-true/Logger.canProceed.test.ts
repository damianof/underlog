import { Logger } from '../../src/main'

describe('Logger.canProceed with transportLevelOnly true', () => {
  const logger = new Logger({
    levels: ['info', 'warn', 'warn-high', 'error'],
    transports: [],
  })
  const transportLevelOnly = true

  describe('transportLevel: log', () => {
    const transportLevel = 'log'

    it('should return true when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })
      expect(result).toEqual(true)
    })

    it('should return false when level is highlight', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })
      expect(result).toEqual(false)
    })

    it('should return false when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'false',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'false',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn-high ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(false)
    })
  })

  describe('transportLevel: highlight', () => {
    const transportLevel = 'highlight'

    it('should return false when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })
      expect(result).toEqual(false)
    })

    it('should return true when level is highlight ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })
      expect(result).toEqual(true)
    })

    it('should return false when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'false',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'false',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn-high ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(false)
    })
  })

  describe('transportLevel: debug', () => {
    const transportLevel = 'debug'

    it('should return false when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })
      expect(result).toEqual(false)
    })

    it('should return false when level is highlight ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })
      expect(result).toEqual(false)
    })

    it('should return true when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(true)
    })

    it('should return false when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'false',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'false',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn-high ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(false)
    })
  })

  describe('transportLevel: info', () => {
    const transportLevel = 'info'

    it('should return false when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is highlight ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(false)
    })

    it('should return true when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'info',
      })

      expect(result).toEqual(true)
    })

    it('should return false when level is warn', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn-high', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(false)
    })
  })

  describe('transportLevel: warn', () => {
    const transportLevel = 'warn'

    it('should return false when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is highlight ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'info',
      })

      expect(result).toEqual(false)
    })

    it('should return true when level is warn ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn',
      })

      expect(result).toEqual(true)
    })

    it('should return false when level is warn-high ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(false)
    })
  })

  describe('transportLevel: warn-high', () => {
    const transportLevel = 'warn-high'

    it('should return false when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is highlight ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'info',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn',
      })

      expect(result).toEqual(false)
    })

    it('should return true when level is warn-high ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(true)
    })

    it('should return false when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(false)
    })
  })

  describe('transportLevel: error', () => {
    const transportLevel = 'error'

    it('should return false when level is log ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'log',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is highlight ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'highlight',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is debug ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'debug',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is info ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'info',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn',
      })

      expect(result).toEqual(false)
    })

    it('should return false when level is warn-high ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'warn-high',
      })

      expect(result).toEqual(false)
    })

    it('should return true when level is error ', async () => {
      const result = await logger.canProceed({
        transportLevel: transportLevel,
        transportLevelOnly: transportLevelOnly,
        level: 'error',
      })

      expect(result).toEqual(true)
    })
  })
})