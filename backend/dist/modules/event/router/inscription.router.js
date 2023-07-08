"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InscriptionRouter = void 0;
const express_1 = require("express");
class InscriptionRouter {
    constructor(inscriptionController) {
        this.inscriptionController = inscriptionController;
        this._inscriptionRoutes = (0, express_1.Router)();
        this.init();
    }
    get inscriptionRoutes() {
        return this._inscriptionRoutes;
    }
    init() {
        this._inscriptionRoutes.route("").post((req, res) => {
            this.inscriptionController.create(req, res);
        });
        this._inscriptionRoutes.route("/:id").get((req, res) => {
            this.inscriptionController.get(req, res);
        });
        this._inscriptionRoutes.route("").get((req, res) => {
            this.inscriptionController.getAll(req, res);
        });
        this._inscriptionRoutes.route("/:id").delete((req, res) => {
            this.inscriptionController.delete(req, res);
        });
        this._inscriptionRoutes.route("/:id/user").get((req, res) => {
            this.inscriptionController.getUser(req, res);
        });
    }
}
exports.InscriptionRouter = InscriptionRouter;
