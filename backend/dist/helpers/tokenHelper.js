"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.generateRandomToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateRandomToken() {
    return crypto_1.default.randomBytes(20).toString('hex');
}
exports.generateRandomToken = generateRandomToken;
function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
exports.generateOTP = generateOTP;
