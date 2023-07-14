"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const multer_1 = require("../../../config/multer");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const auth_service_1 = require("../service/auth.service");
const upload = (0, multer_1.multerConfig)();
class UserRouter {
    constructor(userController) {
        this.userController = userController;
        this._userRoutes = (0, express_1.Router)();
        this.init();
    }
    get userRoutes() {
        return this._userRoutes;
    }
    init() {
        this._userRoutes
            .route("")
            .post((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN]), upload.single("photo"), (req, res) => {
            this.userController.create(req, res);
        })
            .get((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN]), (req, res) => {
            this.userController.getAll(req, res);
        });
        this._userRoutes
            .route("/:id")
            .get((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.userController.get(req, res);
        })
            .delete((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.userController.delete(req, res);
        })
            .put((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), upload.single("photo"), (req, res) => {
            this.userController.update(req, res);
        });
        this._userRoutes
            .route("/favoriteplate/:id")
            .get((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.userController.favoritePlat(req, res);
        });
        this._userRoutes
            .route("/favoriteplate/:id/:platId")
            .put((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN, auth_service_1.ROLES.CLIENT]), (req, res) => {
            this.userController.addPlatToFavorite(req, res);
        });
        this._userRoutes
            .route("/:id/confirmed")
            .patch((0, authMiddleware_1.authorize)([auth_service_1.ROLES.ADMIN]), (req, res) => {
            this.userController.toggleConfirmation(req, res);
        });
    }
}
exports.UserRouter = UserRouter;
