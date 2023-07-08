"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepositoy = void 0;
const InternalError_1 = require("../../../errors/InternalError");
class TokenRepositoy {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    set(key, value, expireAt) {
        try {
            this.redisClient.set(key, value);
            if (expireAt) {
                this.redisClient.expire(key, expireAt);
            }
        }
        catch (error) {
            throw new InternalError_1.InternalError(error);
        }
    }
    get(key) {
        return this.redisClient.get(key);
    }
}
exports.TokenRepositoy = TokenRepositoy;
