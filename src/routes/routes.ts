import { Router, Express } from "express";
import { UserRouter } from "../modules/user/router/user.router";
import { IngredientRouter } from "../modules/stock/router/ingredient.router";

export class Routes {
  constructor(private app: Express,private userRouter:UserRouter,private ingredientRouter:IngredientRouter) {}

  init() {
    this.app.use("/users",this.userRouter.userRoutes)
    this.app.use("/ingredient",this.ingredientRouter.ingredientRoutes)
  }
}
