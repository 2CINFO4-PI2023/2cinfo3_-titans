import { Router } from "express";
import { IUserController } from "../controller/user.controller";

export class UserRouter {
  private _userRoutes: Router = Router();
  constructor(private userController: IUserController) {
    this.init();
  }
  public get userRoutes() {
    return this._userRoutes;
  }
  private init() {
    this._userRoutes.route("").post((req,res)=>{
      this.userController.create(req,res)
    });
  }
}
