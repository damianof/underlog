"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransport = void 0;
class BaseTransport {
    constructor(params) {
        this.level = Object.freeze(params.level);
        this.levelOnly = Object.freeze(params.levelOnly);
    }
}
exports.BaseTransport = BaseTransport;
