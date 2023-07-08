"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidObjectIdError = void 0;
const HTTPError_1 = require("./HTTPError");
class InvalidObjectIdError extends HTTPError_1.HTTPError {
    constructor() {
        super(400, "The id is not a valid ObjectID", "Invalid field");
    }
}
exports.InvalidObjectIdError = InvalidObjectIdError;
