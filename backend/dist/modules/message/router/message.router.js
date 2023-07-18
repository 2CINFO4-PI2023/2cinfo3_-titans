"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRouter = void 0;
const express_1 = require("express");
class MessageRouter {
    constructor(messageController) {
        this.messageController = messageController;
        this._messageRoutes = (0, express_1.Router)();
        this.init();
    }
    get messageRoutes() {
        return this._messageRoutes;
    }
    init() {
        this._messageRoutes.route("").post((req, res) => {
            this.messageController.create(req, res);
        });
        this._messageRoutes.route("/admin/:idUser").post((req, res) => {
            this.messageController.adminMessage(req, res);
        });
        this._messageRoutes.route("/:id").get((req, res) => {
            this.messageController.get(req, res);
        });
        this._messageRoutes.route("/:idUser/:idReclamation").post((req, res) => {
            this.messageController.reclamtionReplyMessage(req, res);
        });
        this._messageRoutes.route("").get((req, res) => {
            this.messageController.getAll(req, res);
        });
        this._messageRoutes.route("/:id").post((req, res) => {
            this.messageController.askchatbot(req, res);
        });
        this._messageRoutes.route("/:id").put((req, res) => {
            this.messageController.update(req, res);
        });
        this._messageRoutes.route("/messages/:id").get((req, res) => {
            this.messageController.getbyUserId(req, res);
        });
        this._messageRoutes.route("/:id").delete((req, res) => {
            this.messageController.delete(req, res);
        });
    }
}
exports.MessageRouter = MessageRouter;
