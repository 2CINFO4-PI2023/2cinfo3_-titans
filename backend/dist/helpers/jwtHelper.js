"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
exports.generateAccessToken = generateAccessToken;
function decodeAccessToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    return decoded;
}
exports.decodeAccessToken = decodeAccessToken;
