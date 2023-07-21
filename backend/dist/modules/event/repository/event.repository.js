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
exports.EventRepository = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
const event_schema_1 = require("../model/event.schema");
class EventRepository {
    constructor() { }
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield event_schema_1.Event.create(event);
                return doc;
            }
            catch (error) {
                if (error.code === 11000) {
                    // Handle duplicate key error
                    throw new DuplicatedError_1.DuplicatedError("Event already exists");
                }
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield event_schema_1.Event.findById(id);
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
                const docs = yield event_schema_1.Event.find().populate('eventType');
                return docs;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield event_schema_1.Event.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield event_schema_1.Event.findByIdAndUpdate(id, event);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_schema_1.Event.findById(id);
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.EventRepository = EventRepository;
