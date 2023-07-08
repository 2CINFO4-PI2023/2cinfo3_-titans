"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const HTTPError_1 = require("./HTTPError");
class InternalError extends HTTPError_1.HTTPError {
    constructor(description) {
        super(500, description, "Internal Error");
    }
}
exports.InternalError = InternalError;
