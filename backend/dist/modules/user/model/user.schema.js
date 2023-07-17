"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, sparse: true, unique: true },
    address: String,
    image: String,
    password: { type: String },
    confirmed: { type: Boolean, default: false },
    favoritePlat: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Plat' }],
    role: Number
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)("User", userSchema);
