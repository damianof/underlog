//const UnderLog = require('underlog') .default;
const { UnderLog, transports } = require('underlog');
const { StdErrTransport } = transports

console.log(UnderLog, StdErrTransport)

const stdErrTransport = new StdErrTransport({
  level: 'info',
  levelOnly: false
});
// stdErrTransport.write({
//   timestamp: new Date(),
//   level: 'info',
//   message: 'node logging test'
// }).then((result) => {
//   console.log('result', result);
// });

// if using Typescript
// interface UnderLog {
//   info(message: string, data?: any): void;
// }
UnderLog.prototype['info'] = function(message, data) {
  const level = 'info'
  if (arguments.length > 1) {
    this.log(level, message, data)
  } else {
    this.log(level, message)
  }
};
UnderLog.prototype['warn'] = function(message, data) {
  const level = 'warn'
  if (arguments.length > 1) {
    this.log(level, message, data)
  } else {
    this.log(level, message)
  }
};
UnderLog.prototype['error'] = function(message, data) {
  const level = 'error'
  if (arguments.length > 1) {
    this.log(level, message, data)
  } else {
    this.log(level, message)
  }
};

const logger = new UnderLog({
  levels: ['info', 'warn', 'warn-high', 'error'],
  transports: [stdErrTransport]
});

// should not log data because we are not passing it (it should not print 'undefined')
console.log('following should not print "undefined" for data as we are not passing it');
logger.log('log', 'test log');
logger.highlight('test highlight');
logger.debug('test debug');
logger.info('test info');
logger.warn('test warn');
logger.error('test error');

// should log data as 'udnefined' because we are passing it but is not defined
console.log('following should print "undefined" for data because we are passing it and it\'s not defined');
let data = undefined; // should print 'undefined'
logger.log('log', 'test log', data);
logger.highlight('test highlight', data);
logger.debug('test debug', data);
logger.info('test info', data);
logger.warn('test warn', data);
logger.error('test error', data);

// should log data because we are passing it and it is defined
console.log('following should print our data object as serialized JSON');
data = { name: 'This is some test js object' }; // should print this a serialized JSON
logger.log('log', 'test log', data);
logger.highlight('test highlight', data);
logger.debug('test debug', data);
logger.info('test info', data);
logger.warn('test warn', data);
logger.error('test error', data);



