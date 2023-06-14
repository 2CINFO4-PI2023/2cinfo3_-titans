import { Router, Express } from "express";
import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";

export class Routes {
  constructor(private app: Express,private reclamationRouter:ReclamationRouter) {}

  init() {
    this.app.use("/reclamations",this.reclamationRouter.reclamationRoutes)
  }
}
