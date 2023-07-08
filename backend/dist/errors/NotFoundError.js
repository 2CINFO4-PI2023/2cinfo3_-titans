"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const HTTPError_1 = require("./HTTPError");
class NotFoundError extends HTTPError_1.HTTPError {
    constructor(description) {
        super(404, description, "Not found");
    }
}
exports.NotFoundError = NotFoundError;
