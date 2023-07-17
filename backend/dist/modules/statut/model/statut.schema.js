"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statut = void 0;
const mongoose_1 = require("mongoose");
const statutSchema = new mongoose_1.Schema({
    statut: { type: String, required: true },
});
exports.Statut = (0, mongoose_1.model)("Statut", statutSchema);
