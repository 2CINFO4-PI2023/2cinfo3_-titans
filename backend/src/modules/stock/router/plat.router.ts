import { Router } from "express";
import { IPlatController } from "../controller/plat.controller";
import { multerConfig } from "../../../config/multer";
const upload = multerConfig();
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
            .post(upload.single("image"),(req, res) => {
                this.platController.create(req, res);
            })
            .get((req, res) => {
                this.platController.getAll(req, res);
            });
        this._platRoutes
            .route("/latestplat")
            .get((req, res) => {
                this.platController.getlatestPlat(req, res);
            });
        this._platRoutes
            .route("/:id")
            .get((req, res) => {
                this.platController.get(req, res);
            })
            .delete((req, res) => {
                this.platController.delete(req, res);
            })
            .put(upload.single("image"),(req, res) => {
                this.platController.update(req, res);
            });
        this._platRoutes
            .route("/commands/:id")
            .get((req, res) => {
                this.platController.platCommand(req, res);
            });
        this._platRoutes
            .route("/calories/:id")
            .get((req, res) => {
                this.platController.calculCalories(req, res);
            });
    }
}