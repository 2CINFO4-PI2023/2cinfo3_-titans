"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reclamation = void 0;
const mongoose_1 = require("mongoose");
const reclamationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    type: String,
    message: String
});
exports.Reclamation = (0, mongoose_1.model)("Reclamation", reclamationSchema);
