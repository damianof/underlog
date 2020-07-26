import { 
  ILogTransport, 
  ILogTransportWriteParams 
} from '@/ILogTransport'

export abstract class BaseTransport implements ILogTransport {
  public readonly level!: string
  public readonly levelOnly!: boolean
  
  constructor(params: {
    level: string
    levelOnly: boolean
  }) {
    this.level = Object.freeze(params.level)
    this.levelOnly = Object.freeze(params.levelOnly)
  }
  
  /**
   * @name write
   * @description Must override in inheriting class
   * @param params 
   */
  abstract write(params: ILogTransportWriteParams): Promise<boolean>
}