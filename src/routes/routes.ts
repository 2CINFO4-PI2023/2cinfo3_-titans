import { Router, Express } from "express";
import { UserRouter } from "../modules/user/router/user.router";
import { AuthRouter } from "../modules/user/router/auth.router";
import { validateJwtToken } from "../middlewares/authMiddleware";
import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";
import { StatutRouter } from "../modules/statut/router/statut.router";
import { MessageRouter } from "../modules/message/router/message.router";

export class Routes {
  constructor(private app: Express,
    private reclamationRouter:ReclamationRouter,
    private statutRouter:StatutRouter,
    private messageRouter:MessageRouter,
    private userRouter:UserRouter
    ,private authRouter:AuthRouter) {}

  init() {
    this.app.use("/auth",this.authRouter.userRoutes)
    this.app.use("/message",this.messageRouter.messageRoutes)
    this.app.use("/reclamations",this.reclamationRouter.reclamationRoutes);
    this.app.use("/statuts",this.statutRouter.statutRoutes);
    this.app.use(validateJwtToken).use("/users",this.userRouter.userRoutes)
  
    
  }
}
