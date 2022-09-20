import { Logger, StdErrTransport } from 'underlog'

// setup StdErr transport
const stdErrTransport = new StdErrTransport({
  level: 'error',
  levelOnly: false,
})

// setup Logger
const logger = new Logger({
  // levels: ['log', 'highlight', 'debug', 'info', 'warn', 'warnhigh', 'error'],
  transports: [stdErrTransport],
})

// should not log data because we are not passing it (it should not print 'undefined')
console.log(
  '---------------------- following should not print "undefined" for data as we are not passing it ----------------------'
)
logger.log('log', 'test log')
logger.highlight('test highlight')
logger.debug('test debug')
logger.info('test info')
logger.warn('test warn')
logger.error('test error')

// should log data as 'udnefined' because we are passing it but is not defined
console.log(
  '---------------------- following should print "undefined" for data because we are passing it and it\'s not defined ----------------------'
)
let data = undefined // should print 'undefined'
logger.log('log', 'test log', data)
logger.highlight('test highlight', data)
logger.debug('test debug', data)
logger.info('test info', data)
logger.warn('test warn', data)
logger.error('test error', data)

// should log data because we are passing it and it is defined
console.log(
  '---------------------- following should print our data object as serialized JSON ----------------------'
)
data = { name: 'This is some test js object' } // should print this a serialized JSON
logger.log('log', 'test log', data)
logger.highlight('test highlight', data)
logger.debug('test debug', data)
logger.info('test info', data)
logger.warn('test warn', data)
logger.error('test error', data)
