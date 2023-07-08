import { Router } from "express";
import { IInscriptionController } from "../controller/inscription.controller";

export class InscriptionRouter {
  private _inscriptionRoutes: Router = Router();
  constructor(private inscriptionController: IInscriptionController) {
    this.init();
  }
  public get inscriptionRoutes() {
    return this._inscriptionRoutes;
  }
  private init() {
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
    this._inscriptionRoutes.route("/:id/user").get((req, res) => { // Add the user route
      this.inscriptionController.getUser(req, res);
    });
  }
}
