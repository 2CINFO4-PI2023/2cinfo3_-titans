"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientStockError = void 0;
const HTTPError_1 = require("./HTTPError");
class InsufficientStockError extends HTTPError_1.HTTPError {
    constructor() {
        super(406, "Insufficient Stock", "Insufficient ingredient to this plat request another dish");
    }
}
exports.InsufficientStockError = InsufficientStockError;
