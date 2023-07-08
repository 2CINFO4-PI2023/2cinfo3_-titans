"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const HTTPError_1 = require("./HTTPError");
class UnauthorizedError extends HTTPError_1.HTTPError {
    constructor(description) {
        super(401, description, "Unauthorized");
    }
}
exports.UnauthorizedError = UnauthorizedError;
