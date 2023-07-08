"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatRouter = void 0;
const express_1 = require("express");
class PlatRouter {
    constructor(platController) {
        this.platController = platController;
        this._platRoutes = (0, express_1.Router)();
        this.init();
    }
    get platRoutes() {
        return this._platRoutes;
    }
    init() {
        this._platRoutes
            .route("")
            .post((req, res) => {
            this.platController.create(req, res);
        })
            .get((req, res) => {
            this.platController.getAll(req, res);
        });
        this._platRoutes
            .route("/latestplat")
            .get((req, res) => {
            this.platController.getlatestPlat(req, res);
        });
        this._platRoutes
            .route("/:id")
            .get((req, res) => {
            this.platController.get(req, res);
        })
            .delete((req, res) => {
            this.platController.delete(req, res);
        })
            .put((req, res) => {
            this.platController.update(req, res);
        });
        this._platRoutes
            .route("/commands/:id")
            .get((req, res) => {
            this.platController.platCommand(req, res);
        });
        this._platRoutes
            .route("/calories/:id")
            .get((req, res) => {
            this.platController.calculCalories(req, res);
        });
    }
}
exports.PlatRouter = PlatRouter;
