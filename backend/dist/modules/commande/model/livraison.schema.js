"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livraison = void 0;
const mongoose_1 = require("mongoose");
const livraisonSchema = new mongoose_1.Schema({
    commande: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Commande" },
    deliveryMan: {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
    },
    deliveryStatus: { type: String, required: false, default: "Processing" },
}, {
    timestamps: true,
});
exports.Livraison = (0, mongoose_1.model)("Livraison", livraisonSchema);
