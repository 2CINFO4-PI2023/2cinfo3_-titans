"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeRouter = void 0;
const express_1 = require("express");
class EventTypeRouter {
    constructor(eventTypeController) {
        this.router = (0, express_1.Router)();
        this.eventTypeController = eventTypeController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/", this.eventTypeController.createEventType);
        this.router.get("/", this.eventTypeController.getAllEventTypes);
        this.router.get("/:id", this.eventTypeController.getEventTypeById);
        this.router.put("/:id", this.eventTypeController.updateEventType);
        this.router.delete("/:id", this.eventTypeController.deleteEventType);
        this.router.get("/count/:eventTypeId", this.eventTypeController.getEventCountByType);
    }
    get eventTypeRoutes() {
        return this.router;
    }
}
exports.EventTypeRouter = EventTypeRouter;
