import { Router } from "express";
import { IStatutController } from "../controller/statut.controller";

export class StatutRouter {
  private _statutRoutes: Router = Router();

  constructor(private statutController: IStatutController) {
    this.init();
  }

  public get statutRoutes() {
    return this._statutRoutes;
  }

  private init() {

    this._statutRoutes.route("/findStatus/:statut").get((req, res) => {
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
