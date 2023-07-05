import { Router } from "express";
import { ICommandeController } from "../controller/commande.controller";

export class CommandeRouter {
  private _commandeRoutes: Router = Router();

  constructor(private commandeController: ICommandeController) {
    this.init();
  }

  public get commandeRoutes() {
    return this._commandeRoutes;
  }

  private init() {
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
  }
}
