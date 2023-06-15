import { Router, Express } from "express";
import { UserRouter } from "../modules/user/router/user.router";
import { IngredientRouter } from "../modules/stock/router/ingredient.router";
import { PlatRouter } from "../modules/stock/router/plat.router";

export class Routes {
  constructor(private app: Express,private userRouter:UserRouter,private ingredientRouter:IngredientRouter,private platRouter:PlatRouter) {}

  init() {
    this.app.use("/users",this.userRouter.userRoutes)
    this.app.use("/ingredients",this.ingredientRouter.ingredientRoutes)
    this.app.use("/plats",this.platRouter.platRoutes)
  }
}
