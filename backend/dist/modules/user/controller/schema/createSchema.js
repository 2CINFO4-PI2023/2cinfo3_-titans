"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.required(),
    file: joi_1.default.any(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().length(8).optional(),
    address: joi_1.default.string().optional(),
    password: joi_1.default.string().min(8).optional()
});
