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
exports.EventType = void 0;
const mongoose_1 = require("mongoose");
const event_schema_1 = require("./event.schema");
const eventTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    // Define other fields and their types
});
eventTypeSchema.statics.getEventCountByType = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const eventCounts = yield event_schema_1.Event.aggregate([
            {
                $group: {
                    _id: "$eventType",
                    count: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "eventtypes",
                    localField: "_id",
                    foreignField: "_id",
                    as: "eventType",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: { $arrayElemAt: ["$eventType.name", 0] },
                    count: 1,
                },
            },
        ]);
        return eventCounts;
    });
};
exports.EventType = (0, mongoose_1.model)("EventType", eventTypeSchema);
