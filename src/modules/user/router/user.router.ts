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
    this._userRoutes
      .route("")
      .post((req, res) => {
        this.userController.create(req, res);
      })
      .get((req, res) => {
        this.userController.getAll(req, res);
      });
    this._userRoutes
      .route("/:id")
      .get((req, res) => {
        this.userController.get(req, res);
      })
      .delete((req, res) => {
        this.userController.delete(req, res);
      })
      .put((req, res) => {
        this.userController.update(req, res);
      });
    this._userRoutes
      .route("favoriteplate/:id")
      .get((req, res) => {
        this.userController.favoritePlat(req, res);
      });
      this._userRoutes
      .route("favoriteplate/:userId/:platId")
      .put((req, res) => {
        this.userController.addPlatToFavorite(req, res);
      });
  }
}
