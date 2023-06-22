import { Router } from "express";
import { IPlatController } from "../controller/plat.controller";

export class PlatRouter {
    private _platRoutes: Router = Router();
    constructor(private platController: IPlatController) {
        this.init();
    }
    public get platRoutes() {
        return this._platRoutes;
    }
    init() {
        this._platRoutes
            .route("")
            .post((req, res) => {
                this.platController.create(req, res);
            })
            .get((req, res) => {
                this.platController.getAll(req, res);
            });
        this._platRoutes
            .route("/:id")
            .get((req, res) => {
                this.platController.get(req, res);
            })
            .delete((req, res) => {
                this.platController.delete(req, res);
            })
            .put((req, res) => {
                this.platController.update(req, res);
<<<<<<< HEAD
            });
            this._platRoutes
            .route("/commands/:id")
            .get((req, res) => {
                this.platController.platCommand(req, res);
=======
>>>>>>> 1b8c059 (add ingredient management through plate command)
            })
    }
}