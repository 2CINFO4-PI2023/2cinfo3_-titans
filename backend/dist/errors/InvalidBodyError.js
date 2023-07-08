"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidBodyError = void 0;
const HTTPError_1 = require("./HTTPError");
class InvalidBodyError extends HTTPError_1.HTTPError {
    constructor(description) {
        super(400, description, "Invalid Body");
    }
}
exports.InvalidBodyError = InvalidBodyError;
