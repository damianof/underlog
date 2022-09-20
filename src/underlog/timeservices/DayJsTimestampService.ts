const dayjs = require('dayjs')

export class DayJsTimestampService {
  getTimestamp(): string {
    return dayjs().format()
  }
}
