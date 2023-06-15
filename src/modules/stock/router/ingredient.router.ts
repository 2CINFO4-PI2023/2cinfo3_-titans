import { Router } from "express";
import { IIngredientController } from "../controller/ingredient.controller";

export class IngredientRouter {
    private _ingredientRoutes: Router = Router();
    constructor(private ingredientController: IIngredientController) {
        this.init();
    }
    public get ingredientRoutes() {
        return this._ingredientRoutes;
    }
    init() {
        this._ingredientRoutes
            .route("")
            .post((req, res) => {
                this.ingredientController.create(req, res);
            })
            .get((req, res) => {
                this.ingredientController.getAll(req, res);
            });
        this._ingredientRoutes
            .route("/:id")
            .get((req, res) => {
                this.ingredientController.get(req, res);
            })
            .delete((req, res) => {
                this.ingredientController.delete(req, res);
            })
            .put((req, res) =>{
                this.ingredientController.update(req,res);
            })
    }
}