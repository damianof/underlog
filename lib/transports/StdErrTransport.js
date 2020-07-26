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
            error: '0;1;31m' // red, bold
        };
        if (params.levelStyles) {
            this.levelStyles = Object.freeze(params.levelStyles);
        }
    }
    write(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const { timestamp, level, message } = params;
                let outData = 'undefined';
                const includesData = Object.keys(params).length === 4;
                console.log('includesData', includesData, Object.keys(params).length);
                // try to stringify data if is JSON
                if (includesData && params.data) {
                    if (typeof params.data === 'string') {
                        outData = params.data;
                    }
                    else {
                        try {
                            outData = JSON.stringify(params.data);
                        }
                        catch (_a) {
                            outData = params.data.toString();
                        }
                    }
                }
                const outMessage = `${timestamp} ${this.prefix}${this.levelStyles[level]}${level}${this.suffix}: ${message}`;
                if (includesData) {
                    console.log(outMessage, outData);
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
