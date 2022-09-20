import { ITimestampService } from './ITimestampService';
import { ILogTransport, ILogTransportWriteParams } from './ILogTransport';
export interface ILogger {
    canProceed(params: {
        transportLevel: string;
        transportLevelOnly: boolean;
        level: string;
    }): Promise<boolean>;
    transportsWrite(params: ILogTransportWriteParams): Promise<boolean>;
    log(...args: any): void;
    highlight(...args: any): void;
    debug(...args: any): void;
}
export interface ILoggerOptions {
    levels?: string[];
    transports?: ILogTransport[];
    timestampService?: ITimestampService;
}
export declare class Logger implements ILogger {
    private supportedLevels;
    private transports;
    private timestampService;
    private timestamp;
    constructor(options?: ILoggerOptions);
    private initLevels;
    private initTransports;
    private initTimestampService;
    canProceed(params: {
        transportLevel: string;
        transportLevelOnly: boolean;
        level: string;
    }): Promise<boolean>;
    transportsWrite(params: ILogTransportWriteParams): Promise<boolean>;
    log(...args: any[]): void;
    highlight(...args: any): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
