import { Router } from "express";
import { IReclamationController } from "../controller/reclamation.controller";
import { authorize } from "../../../middlewares/authMiddleware";
import { ROLES } from "../../user/service/auth.service";

export class ReclamationRouter {
  private _reclamationRoutes: Router = Router();

  constructor(private reclamationController: IReclamationController) {
    this.init();
  }

  public get reclamationRoutes() {
    return this._reclamationRoutes;
  }

  private init() {
    this._reclamationRoutes
      .route("")
      .post(authorize([ROLES.ADMIN, ROLES.CLIENT]), (req, res) => {
        this.reclamationController.create(req, res);
      })
      .get(authorize([ROLES.ADMIN]), (req, res) => {
        this.reclamationController.getAll(req, res);
      });

    this._reclamationRoutes
      .route("/:id")
      .get(authorize([ROLES.ADMIN, ROLES.CLIENT]), (req, res) => {
        this.reclamationController.get(req, res);
      })
      .put(authorize([ROLES.ADMIN, ROLES.CLIENT]), (req, res) => {
        this.reclamationController.update(req, res);
      })
      .delete(authorize([ROLES.ADMIN, ROLES.CLIENT]), (req, res) => {
        this.reclamationController.delete(req, res);
      });
  }
}
