"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
class HTTPError extends Error {
    constructor(http_code, description, message) {
        super(message);
        this.http_code = http_code;
        this.description = description;
    }
}
exports.HTTPError = HTTPError;
