"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeTransport = void 0;
const tslib_1 = require("tslib");
const BaseTransport_1 = require("./BaseTransport");
class ChromeTransport extends BaseTransport_1.BaseTransport {
    constructor(params) {
        super(params);
        this.prefix = Object.freeze('%c ');
        this.levelStyles = {
            log: 'background: blue; color: white',
            highlight: 'background: yellow;',
            debug: 'background: blue; color: white',
            info: 'background: green; color: white',
            warn: 'background: orange; color: white',
            ['warn-high']: 'font-size: 20px; background: orange; color: white',
            error: 'background: red; color: white'
        };
        if (params.levelStyles) {
            this.levelStyles = Object.freeze(params.levelStyles);
        }
    }
    write(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const { timestamp, level, message } = params;
                let outData = '';
                const includesData = this.tryGetData(params, outData);
                let isChrome = false;
                if (navigator) {
                    isChrome = /chrome/gi.test(navigator.userAgent);
                }
                if (level !== 'log' && isChrome) {
                    const outMessage = `${timestamp} ${this.prefix + level}: ${message}`;
                    if (includesData) {
                        console.log(outMessage, this.levelStyles[level], outData);
                    }
                    else {
                        console.log(outMessage, this.levelStyles[level]);
                    }
                }
                else {
                    const outMessage = `${timestamp} ${level}: ${message}`;
                    if (includesData) {
                        console.log(outMessage, outData);
                    }
                    else {
                        console.log(outMessage);
                    }
                }
                resolve(true);
            });
        });
    }
}
exports.ChromeTransport = ChromeTransport;
