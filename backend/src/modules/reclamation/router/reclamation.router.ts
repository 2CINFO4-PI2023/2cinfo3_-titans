import { Router } from "express";
import { IReclamationController } from "../controller/reclamation.controller";

export class ReclamationRouter {
  private _reclamationRoutes: Router = Router();

  constructor(private reclamationController: IReclamationController) {
    this.init();
  }

  public get reclamationRoutes() {
    return this._reclamationRoutes;
  }

  private init() {
    this._reclamationRoutes.route("/:id").post((req, res) => {
      this.reclamationController.create(req, res);
    });

    this._reclamationRoutes.route("/fetchByStatut/:statut").get((req, res) => {
      this.reclamationController.fetchByStatut(req, res);
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
