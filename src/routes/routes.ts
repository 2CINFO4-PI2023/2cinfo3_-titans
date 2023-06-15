import { Router, Express } from "express";
import { UserRouter } from "../modules/user/router/user.router";
import { AuthRouter } from "../modules/user/router/auth.router";
import { validateJwtToken } from "../middlewares/authMiddleware";
import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";

export class Routes {
  constructor(private app: Express,
    private reclamationRouter:ReclamationRouter,
    private userRouter:UserRouter
    ,private authRouter:AuthRouter) {}

  init() {
    this.app.use("/auth",this.authRouter.userRoutes)
    this.app.use(validateJwtToken).use("/users",this.userRouter.userRoutes)
    this.app.use(validateJwtToken).use("/reclamations",this.reclamationRouter.reclamationRoutes);
  }
}
