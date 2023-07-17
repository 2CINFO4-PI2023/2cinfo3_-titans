"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandeRouter = void 0;
const express_1 = require("express");
class CommandeRouter {
    constructor(commandeController) {
        this.commandeController = commandeController;
        this._commandeRoutes = (0, express_1.Router)();
        this.init();
    }
    get commandeRoutes() {
        return this._commandeRoutes;
    }
    init() {
        this._commandeRoutes.route("").post((req, res) => {
            this.commandeController.create(req, res);
        });
        this._commandeRoutes.route("/:id").get((req, res) => {
            this.commandeController.get(req, res);
        });
        this._commandeRoutes.route("").get((req, res) => {
            this.commandeController.getAll(req, res);
        });
        this._commandeRoutes.route("/:id").put((req, res) => {
            this.commandeController.update(req, res);
        });
        this._commandeRoutes.route("/:id").delete((req, res) => {
            this.commandeController.delete(req, res);
        });
        this._commandeRoutes.route("/payment").post((req, res) => {
            this.commandeController.payCommande(req, res);
        });
    }
}
exports.CommandeRouter = CommandeRouter;
