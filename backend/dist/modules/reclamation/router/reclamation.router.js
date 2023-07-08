"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReclamationRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const auth_service_1 = require("../../user/service/auth.service");
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
        this._reclamationRoutes
            .route("")
            .post((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.reclamationController.create(req, res);
        })
            .get((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN]), (req, res) => {
            this.reclamationController.getAll(req, res);
        });
        this._reclamationRoutes
            .route("/:id")
            .get((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.reclamationController.get(req, res);
        })
            .put((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.reclamationController.update(req, res);
        })
            .delete((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.reclamationController.delete(req, res);
        });
    }
}
exports.ReclamationRouter = ReclamationRouter;
