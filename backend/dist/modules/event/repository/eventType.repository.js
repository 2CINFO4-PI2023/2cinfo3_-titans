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
exports.EventTypeRepository = void 0;
const eventType_schema_1 = require("../model/eventType.schema");
class EventTypeRepository {
    create(eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            return eventType_schema_1.EventType.create(eventType);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return eventType_schema_1.EventType.find().exec();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return eventType_schema_1.EventType.findById(id).exec();
        });
    }
    update(id, eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield eventType_schema_1.EventType.findByIdAndUpdate(id, eventType).exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield eventType_schema_1.EventType.findByIdAndDelete(id).exec();
        });
    }
}
exports.EventTypeRepository = EventTypeRepository;
