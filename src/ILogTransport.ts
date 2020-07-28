export interface ILogTransportWriteParams {
  timestamp: string
  level: string
  message: string
  data?: any
}

export interface ILogTransport {
  level: string
  levelOnly: boolean
  write(params: ILogTransportWriteParams): Promise<boolean>
}
