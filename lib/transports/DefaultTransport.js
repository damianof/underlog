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
                // get data as string
                const { dataAsString, hasData } = this.tryGetData(params);
                const outMessage = `${timestamp} ${level}: ${message}`;
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
exports.DefaultTransport = DefaultTransport;
