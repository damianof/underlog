"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StdErrTransport = void 0;
const tslib_1 = require("tslib");
const BaseTransport_1 = require("./BaseTransport");
class StdErrTransport extends BaseTransport_1.BaseTransport {
    constructor(params) {
        super(params);
        this.prefix = Object.freeze('\x1b[');
        this.suffix = Object.freeze('\x1b[0;37m');
        this.levelStyles = {
            log: '0;1;37m',
            highlight: '7;1;36m',
            debug: '0;1;34m',
            info: '0;1;32m',
            warn: '0;1;33m',
            ['warn-high']: '0;1;35m',
            error: '0;1;31m',
        };
        if (params.levelStyles) {
            this.levelStyles = Object.freeze(params.levelStyles);
        }
    }
    write(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const { timestamp, level, message } = params;
                // get data as string
                const { dataAsString, hasData } = this.tryGetData(params);
                const outMessage = `${timestamp} ${this.prefix}${this.levelStyles[level]}${level}${this.suffix}: ${message}`;
                if (hasData) {
                    console.log(outMessage, dataAsString);
                }
                else {
                    console.log(outMessage);
                }
                resolve(true);
            });
        });
    }
}
exports.StdErrTransport = StdErrTransport;
