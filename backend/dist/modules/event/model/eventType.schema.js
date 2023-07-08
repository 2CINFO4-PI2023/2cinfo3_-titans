"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
const mongoose_1 = require("mongoose");
const eventTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    // Define other fields and their types
});
exports.EventType = (0, mongoose_1.model)("EventType", eventTypeSchema);
