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
    this._eventRoutes.route("").post((req, res) => {
      this.eventController.create(req, res);
    });
    this._eventRoutes.route("/:id").get((req, res) => {
      this.eventController.get(req, res);
    });

    this._eventRoutes.route("").get((req, res) => {
      this.eventController.getAll(req, res);
    });

    this._eventRoutes.route("/:id").put((req, res) => {
      this.eventController.update(req, res);
    });

    this._eventRoutes.route("/:id").delete((req, res) => {
      this.eventController.delete(req, res);
    });
  }
}
