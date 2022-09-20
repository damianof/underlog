import { expect } from 'chai'
import { Logger } from '../../src/Logger'

describe('Logger.log with transportLevelOnly false', () => {
  const logger = new Logger({
    levels: ['info', 'warn', 'warn-high', 'error'],
  })
  const transportLevelOnly = false

  describe('with undefined data parameter', () => {
    const data: any = undefined
    it('level log', async () => {
      logger.log('log', 'unit tests with undefined data:', data)
    })
  })

  describe('with no data parameter', () => {
    it('level log ', async () => {
      logger.log('log', 'unit tests')
    })

    it('level info ', async () => {
      logger.log('info', 'unit tests')
    })

    it('level warn ', async () => {
      logger.log('warn', 'unit tests arg1', 'unit test arg 2')
    })

    it('level error ', async () => {
      logger.log(
        'error',
        'unit tests arg 1',
        'unit tests arg 2',
        'unit tests arg 3'
      )
    })
  })
})
