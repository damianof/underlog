// @ts-ignore
import dayjs from 'dayjs'

export class DayJsTimestampService {
  getTimestamp(): string {
    return dayjs().format()
  }
}
