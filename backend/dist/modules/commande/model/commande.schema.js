"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commande = void 0;
const mongoose_1 = require("mongoose");
const commandeSchema = new mongoose_1.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            qty: {
                type: Number,
                required: true,
            },
            discount: {
                type: Number,
                required: false,
            },
            plat: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Plat",
            },
        },
    ],
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    paidAt: {
        type: Date,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: {
        type: Date,
    },
    delivery: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: "Livraison",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Commande = (0, mongoose_1.model)("Commande", commandeSchema);
