"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    description: String,
    from: String,
    date_creation: Date
});
exports.Message = (0, mongoose_1.model)("Message", messageSchema);
