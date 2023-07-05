import { Router } from "express";

import {
    processPayment,
    sendStripApi
} from "../controller/payment.controller"




export class PaymentRouter {
    private _paymentRoutes: Router = Router();
  
    constructor() {
      this.init();
    }
  
    public get paymentRoutes() {
      return this._paymentRoutes;
    }
  
    private init() {
      this._paymentRoutes.route("/process").post(processPayment);
  
      this._paymentRoutes.route("/stripeapi").get(sendStripApi);
  
    }
  }
  