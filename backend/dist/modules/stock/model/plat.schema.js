"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plat = void 0;
const mongoose_1 = require("mongoose");
const platSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    ingredients: {
        type: Map,
        of: Number,
        required: true,
    },
    price: { type: Number, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});
exports.Plat = (0, mongoose_1.model)("Plat", platSchema);
