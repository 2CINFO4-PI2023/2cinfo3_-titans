import { Router } from "express";
import { EventTypeController } from "../controller/eventType.controller";

export class EventTypeRouter {
  private router: Router;
  private eventTypeController: EventTypeController;

  constructor(eventTypeController: EventTypeController) {
    this.router = Router();
    this.eventTypeController = eventTypeController;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", this.eventTypeController.createEventType);
    this.router.get("/", this.eventTypeController.getAllEventTypes);
    this.router.get("/:id", this.eventTypeController.getEventTypeById);
    this.router.put("/:id", this.eventTypeController.updateEventType);
    this.router.delete("/:id", this.eventTypeController.deleteEventType);
  }

  public get eventTypeRoutes(): Router {
    return this.router;
  }
}
