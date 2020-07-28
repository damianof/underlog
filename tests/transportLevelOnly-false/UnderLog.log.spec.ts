import { expect } from 'chai'
import { UnderLog } from '../../src/UnderLog'

describe('UnderLog.log with transportLevelOnly false', () => {

  const underLog = new UnderLog({
    levels: ['info', 'warn', 'warn-high', 'error']
  })
  const transportLevelOnly = false

  it('level log ', async () => {
    underLog.log('log', 'unit tests')
  })

  it('level info ', async () => {
    underLog.log('info', 'unit tests')
  })

  it('level warn ', async () => {
    underLog.log('warn', 'unit tests')
  })

  it('level error ', async () => {
    underLog.log('error', 'unit tests')
  })

})
