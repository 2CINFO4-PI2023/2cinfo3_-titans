import { Router, Express } from "express";
import { UserRouter } from "../modules/user/router/user.router";
import { AuthRouter } from "../modules/user/router/auth.router";
import { validateJwtToken } from "../middlewares/authMiddleware";
import { ReclamationRouter } from "../modules/reclamation/router/reclamation.router";
import { TypereclamationRouter } from "../modules/typereclamation/router/typereclamation.router";
import { MessageRouter } from "../modules/message/router/message.router";

export class Routes {
  constructor(private app: Express,
    private reclamationRouter:ReclamationRouter,
    private typereclamationRouter:TypereclamationRouter,
    private messageRouter:MessageRouter,
    private userRouter:UserRouter
    ,private authRouter:AuthRouter) {}

  init() {
    this.app.use("/auth",this.authRouter.userRoutes)
    this.app.use("/message",this.messageRouter.messageRoutes)
    this.app.use("/reclamations",this.reclamationRouter.reclamationRoutes);
    this.app.use("/typereclamations",this.typereclamationRouter.typereclamationRoutes);
    this.app.use(validateJwtToken).use("/users",this.userRouter.userRoutes)
  
    
  }
}
