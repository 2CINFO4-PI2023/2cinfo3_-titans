"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
const message_schema_1 = require("../model/message.schema");
class MessageRepository {
    constructor() { }
    create(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield message_schema_1.Message.create(message);
                return doc;
            }
            catch (error) {
                if (error.code === 11000) {
                    // Handle duplicate key error
                    throw new DuplicatedError_1.DuplicatedError("Message already exists");
                }
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield message_schema_1.Message.findById(id);
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield message_schema_1.Message.find();
                return docs;
            }
            catch (error) {
                throw error;
            }
        });
    }
    byUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_schema_1.Message.find({ user: userId }, null, { sort: { date_creation: 1 } });
                return messages;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield message_schema_1.Message.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield message_schema_1.Message.findByIdAndUpdate(id, message);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MessageRepository = MessageRepository;
