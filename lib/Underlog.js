"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnderLog = void 0;
const tslib_1 = require("tslib");
class UnderLog {
    constructor(options) {
        const { levels, transports } = options;
        const defaultLevels = ['highlight', 'debug'];
        if ((levels || []).length > 0) {
            this.supportedLevels = [...defaultLevels, ...levels];
        }
        else {
            this.supportedLevels = defaultLevels;
        }
        console.log('UnderLog supportedLevels', this.supportedLevels);
        this.transports = transports;
    }
    get timestamp() {
        return new Date();
    }
    canProceed(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let result = false;
                const { transportLevel, transportLevelOnly, level } = params;
                if (transportLevelOnly) {
                    // log only the level specified in transportLevel
                    result = (transportLevel === level);
                }
                else {
                    // log from level specified in transport level and higher
                    // 'highlight' and 'log' always proceed
                    if (transportLevel === level || ['log', 'highlight'].indexOf(level) > -1) {
                        result = true;
                    }
                    else {
                        // if level is not 'log', 'highlight', or 'error', we can proceed
                        // as long as level is one of the previous levels before transportLevel value
                        const supportedLevels = this.supportedLevels;
                        const currentTransportLevelIndex = supportedLevels.indexOf(transportLevel);
                        if (currentTransportLevelIndex > 1) {
                            const previousLevels = supportedLevels.slice(0, currentTransportLevelIndex);
                            //console.log(`transportLevel: ${transportLevel} level: ${ level } currentTransportLevelIndex: ${ currentTransportLevelIndex } previousLevels`, previousLevels)
                            result = previousLevels.includes(level);
                        }
                    }
                }
                resolve(result);
            });
        });
    }
    transportsWrite(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.transports.forEach((transport) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (this.canProceed({
                        transportLevel: transport.level,
                        transportLevelOnly: transport.levelOnly,
                        level: params.level
                    })) {
                        const result = yield transport.write(params);
                        resolve(result);
                    }
                }));
            });
        });
    }
}
exports.UnderLog = UnderLog;
