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
exports.Inscription = void 0;
const mongoose_1 = require("mongoose");
const event_schema_1 = require("./event.schema");
const inscriptionSchema = new mongoose_1.Schema({
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Event", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
});
inscriptionSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield event_schema_1.Event.findById(doc.eventId);
        if (event) {
            event.availablePlaces -= 1;
            yield event.save();
        }
    });
});
exports.Inscription = (0, mongoose_1.model)("Inscription", inscriptionSchema);
