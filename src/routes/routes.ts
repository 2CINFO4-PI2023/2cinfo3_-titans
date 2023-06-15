import { Router, Express } from "express";

import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";
import { UserRouter } from "../modules/user/router/user.router";
export class Routes {
  constructor(private app: Express,private reclamationRouter:ReclamationRouter,private userRouter:UserRouter) {}

  init() {
    this.app.use("/reclamations",this.reclamationRouter.reclamationRoutes);
    this.app.use("/users",this.userRouter.userRoutes)

  }
}
