"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentTimestampService = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
class MomentTimestampService {
    // constructor(options: {
    //   includeTimestap: boolean
    //   timestampFormat: string
    // }) {
    // }
    getTimestamp() {
        return moment_1.default().format();
    }
}
exports.MomentTimestampService = MomentTimestampService;
