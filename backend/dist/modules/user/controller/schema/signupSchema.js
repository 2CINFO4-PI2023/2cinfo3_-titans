"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    password: joi_1.default.string().min(8).required(),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().required(),
    phone: joi_1.default.string().length(8).optional(),
    address: joi_1.default.string().optional(),
});
