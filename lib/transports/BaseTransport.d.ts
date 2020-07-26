import { ILogTransport, ILogTransportWriteParams } from '@/ILogTransport';
export declare abstract class BaseTransport implements ILogTransport {
    readonly level: string;
    readonly levelOnly: boolean;
    constructor(params: {
        level: string;
        levelOnly: boolean;
    });
    /**
     * @name write
     * @description Must override in inheriting class
     * @param params
     */
    abstract write(params: ILogTransportWriteParams): Promise<boolean>;
}
