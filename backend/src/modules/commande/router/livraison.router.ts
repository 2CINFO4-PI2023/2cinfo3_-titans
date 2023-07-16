import { Router } from "express";
import { ILivraisonController } from "../controller/livraison.controller";

export class LivraisonRouter {
  private _livraisonRoutes: Router = Router();

  constructor(private livraisonController: ILivraisonController) {
    this.init();
  }

  public get livraisonRoutes() {
    return this._livraisonRoutes;
  }

  private init() {
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
