"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.resetPasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .optional()
        .messages({
        'string.pattern.base': 'Password should have at least one lowercase letter, one uppercase letter, and one digit, and its length should be at least 8 characters',
    }),
    otp: joi_1.default.required(),
});
