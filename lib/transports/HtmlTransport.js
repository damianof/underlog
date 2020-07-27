"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlTransport = void 0;
const tslib_1 = require("tslib");
const BaseTransport_1 = require("./BaseTransport");
class HtmlTransport extends BaseTransport_1.BaseTransport {
    constructor(params) {
        super(params);
        this.levelStyles = {
            log: 'color: black',
            highlight: 'background-color: yellow; color: white',
            debug: 'color: blue',
            info: 'color: green',
            warn: 'color: orange',
            ['warn-high']: 'font-size: 20px; background: orange; color: white',
            error: 'color: red'
        };
        this.domElement = params.domElement;
        if (params.levelStyles) {
            this.levelStyles = Object.freeze(params.levelStyles);
        }
    }
    write(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this.domElement || this.domElement.innerHTML === undefined) {
                    reject('HtmlTransport: write: Invalid or undefined dom element');
                }
                else {
                    const { timestamp, level, message } = params;
                    let outData = '';
                    const includesData = this.tryGetData(params, outData);
                    const formatTimstamp = `<span>${timestamp}</span>`;
                    const formatMessage = `<span>${message}</span>`;
                    let formatLevel = ``;
                    if (level !== 'log') {
                        formatLevel = `<span style="${this.levelStyles[level]}">${level}</span>`;
                    }
                    else {
                        formatLevel = `<span>${level}</span>`;
                    }
                    let outHtml = `${formatTimstamp} ${formatLevel}: ${formatMessage}`;
                    if (includesData) {
                        outHtml = `${outHtml}: $ outData }<br/>`;
                    }
                    else {
                        outHtml = `${outHtml}<br/>`;
                    }
                    this.domElement.innerHTML += outHtml;
                    resolve(true);
                }
            });
        });
    }
}
exports.HtmlTransport = HtmlTransport;
