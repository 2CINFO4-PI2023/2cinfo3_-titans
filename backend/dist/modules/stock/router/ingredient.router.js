"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientRouter = void 0;
const express_1 = require("express");
class IngredientRouter {
    constructor(ingredientController) {
        this.ingredientController = ingredientController;
        this._ingredientRoutes = (0, express_1.Router)();
        this.init();
    }
    get ingredientRoutes() {
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
            .route("/outofstock")
            .get((req, res) => {
            this.ingredientController.outOfStock(req, res);
        });
        this._ingredientRoutes
            .route("/:id")
            .get((req, res) => {
            this.ingredientController.get(req, res);
        })
            .delete((req, res) => {
            this.ingredientController.delete(req, res);
        })
            .put((req, res) => {
            this.ingredientController.update(req, res);
        });
    }
}
exports.IngredientRouter = IngredientRouter;
