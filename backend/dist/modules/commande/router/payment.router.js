"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("../controller/payment.controller");
class PaymentRouter {
    constructor() {
        this._paymentRoutes = (0, express_1.Router)();
        this.init();
    }
    get paymentRoutes() {
        return this._paymentRoutes;
    }
    init() {
        this._paymentRoutes.route("/process").post(payment_controller_1.processPayment);
        this._paymentRoutes.route("/stripeapi").get(payment_controller_1.sendStripApi);
    }
}
exports.PaymentRouter = PaymentRouter;
