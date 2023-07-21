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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeRepository = void 0;
const eventType_schema_1 = require("../model/eventType.schema");
const mongoose_1 = __importDefault(require("mongoose"));
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
    getEventCountByType(eventTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventTypeIdObject = new mongoose_1.default.Types.ObjectId(eventTypeId);
            return eventType_schema_1.EventType.aggregate([
                {
                    $match: { _id: eventTypeIdObject },
                },
                {
                    $lookup: {
                        from: 'events',
                        localField: '_id',
                        foreignField: 'eventType',
                        as: 'events',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        count: { $size: '$events' },
                    },
                },
            ]).exec();
        });
    }
}
exports.EventTypeRepository = EventTypeRepository;
