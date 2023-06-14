import { Router } from "express";
import { IEventController } from "../controller/event.controller";

export class EventRouter {
  private _eventRoutes: Router = Router();
  constructor(private eventController: IEventController) {
    this.init();
  }
  public get eventRoutes() {
    return this._eventRoutes;
  }
  private init() {
    this._eventRoutes.route("").post((req,res)=>{
      this.eventController.create(req,res)
    });
  }
}
