import { Router, Express } from "express";
import { EventRouter } from "../modules/event/router/event.router";
import { InscriptionRouter } from "../modules/event/router/inscription.router";

export class Routes {
  constructor(private app: Express, private eventRouter: EventRouter, private inscriptionRouter: InscriptionRouter) {}

  init() {
    this.app.use("/events", this.eventRouter.eventRoutes);
    this.app.use("/inscriptions", this.inscriptionRouter.inscriptionRoutes);
  }
}
