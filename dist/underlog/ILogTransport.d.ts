export interface ILogTransportWriteParams {
    timestamp: string;
    level: string;
    args?: any;
}
export interface ILogTransport {
    level: string;
    levelOnly: boolean;
    write(params: ILogTransportWriteParams): Promise<boolean>;
}
