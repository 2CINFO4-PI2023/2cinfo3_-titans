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
exports.sendStripApi = exports.processPayment = void 0;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Process stripe payments   =>   /payment/process
const processPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: req.body.amount,
                quantity: 1,
            },
        ],
        mode: 'payment',
    });
    res.status(200).json({
        success: true,
        info: session
    });
});
exports.processPayment = processPayment;
// Send stripe API Key   =>   /stripeapi
const sendStripApi = (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
};
exports.sendStripApi = sendStripApi;
