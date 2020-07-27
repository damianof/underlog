"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransport = void 0;
class BaseTransport {
    constructor(params) {
        this.level = Object.freeze(params.level);
        this.levelOnly = Object.freeze(params.levelOnly);
    }
    tryGetData(params, outData) {
        outData = '';
        const includesData = Object.keys(params).length === 4;
        // try to stringify data if is JSON
        if (includesData) {
            if (!params.data) {
                outData = 'undefined';
                return true;
            }
            if (typeof params.data === 'string') {
                outData = params.data;
                return true;
            }
            try {
                outData = JSON.stringify(params.data);
                return true;
            }
            catch (_a) {
                outData = params.data.toString();
                return true;
            }
        }
        else {
            return false;
        }
    }
}
exports.BaseTransport = BaseTransport;
