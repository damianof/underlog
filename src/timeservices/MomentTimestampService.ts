import { ITimestampService } from '../ITimestampService'
import moment from 'moment'

export class MomentTimestampService {
  getTimestamp(): string {
    return moment().format()
  }
}
