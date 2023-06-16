import { Router } from "express";
import { ITypereclamationController } from "../controller/typereclamation.controller";

export class TypereclamationRouter {
  private _typereclamationRoutes: Router = Router();

  constructor(private typereclamationController: ITypereclamationController) {
    this.init();
  }

  public get typereclamationRoutes() {
    return this._typereclamationRoutes;
  }

  private init() {
    this._typereclamationRoutes.route("").post((req, res) => {
      this.typereclamationController.create(req, res);
    });

    this._typereclamationRoutes.route("/:id").get((req, res) => {
      this.typereclamationController.get(req, res);
    });

    this._typereclamationRoutes.route("").get((req, res) => {
      this.typereclamationController.getAll(req, res);
    });

    this._typereclamationRoutes.route("/:id").put((req, res) => {
      this.typereclamationController.update(req, res);
    });

    this._typereclamationRoutes.route("/:id").delete((req, res) => {
      this.typereclamationController.delete(req, res);
    });
  }
}
