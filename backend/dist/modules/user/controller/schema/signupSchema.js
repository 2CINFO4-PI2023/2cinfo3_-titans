"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    password: joi_1.default.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .optional()
        .messages({
        'string.pattern.base': 'Password should have at least one lowercase letter, one uppercase letter, and one digit, and its length should be at least 8 characters',
    }),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().required(),
    phone: joi_1.default.string()
        .regex(/^\+216(20|21|22|23|24|25|26|27|28|29|50|52|53|54|55|56|58|90|91|92|93|94|95|96|97|98|99)\d{6}$/)
        .optional()
        .allow(''),
    address: joi_1.default.string().optional(),
});
