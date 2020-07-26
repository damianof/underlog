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
                const includesData = Object.keys(params).length === 4;
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
