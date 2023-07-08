"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedError = void 0;
const HTTPError_1 = require("./HTTPError");
class DuplicatedError extends HTTPError_1.HTTPError {
    constructor(description) {
        super(409, description, "Duplicated field");
    }
}
exports.DuplicatedError = DuplicatedError;
