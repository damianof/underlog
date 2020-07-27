import { ITimestampService } from './ITimestampService';
import { ILogTransport, ILogTransportWriteParams } from './ILogTransport';
export interface IUnderLog {
    canProceed(params: {
        transportLevel: string;
        transportLevelOnly: boolean;
        level: string;
    }): Promise<boolean>;
    transportsWrite(params: ILogTransportWriteParams): Promise<boolean>;
    log(level: string, message: string, data?: any): void;
    highlight(message: string, data?: any): void;
    debug(message: string, data?: any): void;
}
export interface IUnderLogOptions {
    levels?: string[];
    transports?: ILogTransport[];
    timestampService?: ITimestampService;
}
export declare class UnderLog implements IUnderLog {
    private supportedLevels;
    private transports;
    private timestampService;
    private get timestamp();
    constructor(options: IUnderLogOptions);
    canProceed(params: {
        transportLevel: string;
        transportLevelOnly: boolean;
        level: string;
    }): Promise<boolean>;
    transportsWrite(params: ILogTransportWriteParams): Promise<boolean>;
    log(level: string, message: string, data?: any): void;
    highlight(message: string, data?: any): void;
    debug(message: string, data?: any): void;
}
