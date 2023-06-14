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
    this._reclamationRoutes.route("").post((req,res)=>{
      this.reclamationController.create(req,res)
    });
  }
}
