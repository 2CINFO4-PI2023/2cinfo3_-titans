import { Router } from "express";
import { IUserController } from "../controller/user.controller";
import { multerConfig } from "../../../config/multer";
import {
  authenticateAdmin,
  authorize,
} from "../../../middlewares/authMiddleware";
import { ROLES } from "../service/auth.service";
const upload = multerConfig();

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
      .post(authorize([ROLES.ADMIN]),upload.single("photo"), (req, res) => {
        this.userController.create(req, res);
      })
      .get(authorize([ROLES.ADMIN]),(req, res) => {
        this.userController.getAll(req, res);
      });
    this._userRoutes
      .route("/:id")
      .get(authorize([ROLES.ADMIN, ROLES.CLIENT]),(req, res) => {
        this.userController.get(req, res);
      })
      .delete(authorize([ROLES.ADMIN, ROLES.CLIENT]), (req, res) => {
        this.userController.delete(req, res);
      })
      .put(authorize([ROLES.ADMIN, ROLES.CLIENT]),(req, res) => {
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
