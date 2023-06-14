import { Router, Express } from "express";
import { EventRouter } from "../modules/event/router/event.router";

export class Routes {
  constructor(private app: Express,private eventRouter:EventRouter) {}

  init() {
    this.app.use("/events",this.eventRouter.eventRoutes)
  }
}
