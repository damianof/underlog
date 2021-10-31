"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const timeservices_1 = require("./timeservices");
const transports_1 = require("./transports");
class Logger {
    constructor(options) {
        if (options) {
            const { levels, transports, timestampService } = options;
            this.initLevels(levels);
            this.initTransports(transports);
            this.initTimestampService(timestampService);
        }
        else {
            this.initLevels();
            this.initTransports();
            this.initTimestampService();
        }
    }
    timestamp() {
        if (this.timestampService) {
            return this.timestampService.getTimestamp();
        }
        return new Date().toString();
    }
    initLevels(levels) {
        const defaultLevels = ['highlight', 'debug'];
        if ((levels || []).length > 0) {
            this.supportedLevels = [...defaultLevels, ...levels];
        }
        else {
            this.supportedLevels = defaultLevels;
        }
    }
    initTransports(transports) {
        if ((transports || []).length > 0) {
            this.transports = transports;
        }
        else {
            this.transports = [
                new transports_1.DefaultTransport({
                    level: 'error',
                    levelOnly: false,
                }),
            ];
        }
    }
    initTimestampService(timestampService) {
        if (timestampService && timestampService.getTimestamp) {
            this.timestampService = timestampService;
        }
        else {
            this.timestampService = new timeservices_1.MomentTimestampService();
        }
    }
    canProceed(params) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let result = false;
                const { transportLevel, transportLevelOnly, level } = params;
                if (transportLevelOnly) {
                    // log only the level specified in transportLevel
                    result = transportLevel === level;
                }
                else {
                    // log from level specified in transport level and higher
                    // 'highlight' and 'log' always proceed
                    if (transportLevel === level ||
                        ['log', 'highlight'].indexOf(level) > -1) {
                        result = true;
                    }
                    else {
                        // if level is not 'log', 'highlight', or 'error', we can proceed
                        // as long as level is one of the previous levels before transportLevel value
                        const supportedLevels = this.supportedLevels;
                        const currentTransportLevelIndex = supportedLevels.indexOf(transportLevel);
                        if (currentTransportLevelIndex > 1) {
                            const previousLevels = supportedLevels.slice(0, currentTransportLevelIndex);
                            result = previousLevels.includes(level);
                        }
                    }
                }
                resolve(result);
            });
        });
    }
    transportsWrite(params) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.transports.forEach((transport) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    const canProceeed = yield this.canProceed({
                        transportLevel: transport.level,
                        transportLevelOnly: transport.levelOnly,
                        level: params.level,
                    });
                    if (canProceeed) {
                        const result = yield transport.write(params);
                        resolve(result);
                    }
                }));
            });
        });
    }
    log(level, message, data) {
        const writeParams = {
            timestamp: this.timestamp(),
            level: level,
            message: message,
        };
        if (arguments.length > 2) {
            writeParams.data = data;
        }
        this.transportsWrite(writeParams).then(() => {
            // nothing to do here
        });
    }
    logByCheckingData(args) {
        if (args.length > 2) {
            this.log(args[0], args[1], args[2]);
        }
        else {
            this.log(args[0], args[1]);
        }
    }
    highlight(message, data) {
        this.logByCheckingData(['highlight', ...arguments]);
    }
    debug(message, data) {
        this.logByCheckingData(['debug', ...arguments]);
    }
    info(message, data) {
        this.logByCheckingData(['info', ...arguments]);
    }
    warn(message, data) {
        this.logByCheckingData(['warn', ...arguments]);
    }
    error(message, data) {
        this.logByCheckingData(['error', ...arguments]);
    }
}
exports.Logger = Logger;
