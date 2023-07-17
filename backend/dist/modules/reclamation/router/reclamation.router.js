"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReclamationRouter = void 0;
const express_1 = require("express");
class ReclamationRouter {
    constructor(reclamationController) {
        this.reclamationController = reclamationController;
        this._reclamationRoutes = (0, express_1.Router)();
        this.init();
    }
    get reclamationRoutes() {
        return this._reclamationRoutes;
    }
    init() {
        this._reclamationRoutes.route("/:id").post((req, res) => {
            this.reclamationController.create(req, res);
        });
        this._reclamationRoutes.route("/:id").get((req, res) => {
            this.reclamationController.get(req, res);
        });
        this._reclamationRoutes.route("").get((req, res) => {
            this.reclamationController.getAll(req, res);
        });
        this._reclamationRoutes.route("/:id").put((req, res) => {
            this.reclamationController.update(req, res);
        });
        this._reclamationRoutes.route("/:id").delete((req, res) => {
            this.reclamationController.delete(req, res);
        });
    }
}
exports.ReclamationRouter = ReclamationRouter;
