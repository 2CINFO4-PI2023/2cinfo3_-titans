"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reclamation = void 0;
const mongoose_1 = require("mongoose");
const reclamationSchema = new mongoose_1.Schema({
    statut: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Statut' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    numero: String,
    type: String,
    description: String,
    date_creation: Date
});
exports.Reclamation = (0, mongoose_1.model)("Reclamation", reclamationSchema);
