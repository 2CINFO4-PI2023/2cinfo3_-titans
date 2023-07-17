"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatutRouter = void 0;
const express_1 = require("express");
class StatutRouter {
    constructor(statutController) {
        this.statutController = statutController;
        this._statutRoutes = (0, express_1.Router)();
        this.init();
    }
    get statutRoutes() {
        return this._statutRoutes;
    }
    init() {
        this._statutRoutes.route("/new").get((req, res) => {
            this.statutController.findOrCreateNewStatus(req, res);
        });
        this._statutRoutes.route("").post((req, res) => {
            this.statutController.create(req, res);
        });
        this._statutRoutes.route("/:id").get((req, res) => {
            this.statutController.get(req, res);
        });
        this._statutRoutes.route("").get((req, res) => {
            this.statutController.getAll(req, res);
        });
        this._statutRoutes.route("/:id").put((req, res) => {
            this.statutController.update(req, res);
        });
        this._statutRoutes.route("/:id").delete((req, res) => {
            this.statutController.delete(req, res);
        });
    }
}
exports.StatutRouter = StatutRouter;
