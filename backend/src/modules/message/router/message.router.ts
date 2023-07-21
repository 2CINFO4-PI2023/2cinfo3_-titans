import { Router } from "express";
import { IMessageController } from "../controller/message.controller";

export class MessageRouter {
  private _messageRoutes: Router = Router();

  constructor(private messageController: IMessageController) {
    this.init();
  }

  public get messageRoutes() {
    return this._messageRoutes;
  }

  private init() {
    this._messageRoutes.route("").post((req, res) => {
      this.messageController.create(req, res);
    });
     this._messageRoutes.route("/admin/:idUser").post((req, res) => {
      this.messageController.adminMessage(req, res);
    });

    this._messageRoutes.route("/lastMessage/:idUser").post((req, res) => {
      this.messageController.getLastMessageByUser(req, res);
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
