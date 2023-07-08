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
exports.Event = void 0;
const mongoose_1 = require("mongoose");
const inscription_schema_1 = require("./inscription.schema");
const eventSchema = new mongoose_1.Schema({
    name: { type: String },
    date: { type: Date },
    description: String,
    address: String,
    inscriptions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Inscription" }],
    event_capacity: { type: Number, required: true },
    availablePlaces: { type: Number, required: true },
    eventType: { type: mongoose_1.Schema.Types.ObjectId, ref: "EventType", required: true }, // Add this field
}, { timestamps: true } // Add timestamps option for createdAt and updatedAt fields
);
// Pre-save hook to update the available places when an inscription is created
eventSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const inscriptionCount = yield inscription_schema_1.Inscription.countDocuments({ eventId: this._id });
        this.availablePlaces = this.event_capacity - inscriptionCount;
    });
});
exports.Event = (0, mongoose_1.model)("Event", eventSchema);
