"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTransport = void 0;
const tslib_1 = require("tslib");
const BaseTransport_1 = require("./BaseTransport");
class DefaultTransport extends BaseTransport_1.BaseTransport {
    constructor(params) {
        super(params);
    }
    write(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const { timestamp, level, message } = params;
                let outData = '';
                const includesData = this.tryGetData(params, outData);
                const outMessage = `${timestamp} ${level}: ${message}`;
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
exports.DefaultTransport = DefaultTransport;
