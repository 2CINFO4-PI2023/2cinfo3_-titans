"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivraisonRouter = void 0;
const express_1 = require("express");
class LivraisonRouter {
    constructor(livraisonController) {
        this.livraisonController = livraisonController;
        this._livraisonRoutes = (0, express_1.Router)();
        this.init();
    }
    get livraisonRoutes() {
        return this._livraisonRoutes;
    }
    init() {
        this._livraisonRoutes.route("").post((req, res) => {
            this.livraisonController.create(req, res);
        });
        this._livraisonRoutes.route("/:id").get((req, res) => {
            this.livraisonController.get(req, res);
        });
        this._livraisonRoutes.route("").get((req, res) => {
            this.livraisonController.getAll(req, res);
        });
        this._livraisonRoutes.route("/:id").put((req, res) => {
            this.livraisonController.update(req, res);
        });
        this._livraisonRoutes.route("/:id").delete((req, res) => {
            this.livraisonController.delete(req, res);
        });
    }
}
exports.LivraisonRouter = LivraisonRouter;
