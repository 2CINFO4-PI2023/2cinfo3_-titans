import { Router, Express } from "express";
import {
  IUserController,
  UserController,
} from "../modules/user/controller/user.controller";
import { UserRouter } from "../modules/user/router/user.router";

export class Routes {
  constructor(private app: Express,private userRouter:UserRouter) {}

  init() {
    this.app.use("/users",this.userRouter.userRoutes)
  }
}
