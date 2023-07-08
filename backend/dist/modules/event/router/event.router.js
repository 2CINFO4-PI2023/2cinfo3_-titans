"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const express_1 = require("express");
class EventRouter {
    constructor(eventController, inscriptionController) {
        this.eventController = eventController;
        this.inscriptionController = inscriptionController;
        this._eventRoutes = (0, express_1.Router)();
        this.init();
    }
    get eventRoutes() {
        return this._eventRoutes;
    }
    init() {
        this._eventRoutes.route("").post((req, res) => {
            this.eventController.create(req, res);
        }).get((req, res) => {
            this.eventController.getAll(req, res);
        });
        this._eventRoutes.route("/:id").get((req, res) => {
            this.eventController.get(req, res);
        }).put((req, res) => {
            this.eventController.update(req, res);
        }).delete((req, res) => {
            this.eventController.delete(req, res);
        });
        // Route to create an inscription for an event
        this._eventRoutes.route("/:id/inscriptions").post((req, res) => {
            this.inscriptionController.create(req, res);
        });
    }
}
exports.EventRouter = EventRouter;
