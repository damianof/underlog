import { ITimestampService } from '../ITimestampService'
import dayjs from 'dayjs'

export class DayJsTimestampService {
  getTimestamp(): string {
    return dayjs().format()
  }
}
