import { UnderLog } from './UnderLog'
import { 
  BaseTransport,
  DefaultTransport,
  ChromeTransport,
  StdErrTransport
 } from './transports'

export = {
  UnderLog: UnderLog,
  transports: {
    BaseTransport,
    DefaultTransport,
    ChromeTransport,
    StdErrTransport
  }
}
