import { Router } from "express";
import { IAuthController } from "../controller/auth.controller";
import passport from "passport";

export class AuthRouter {
  private authRoutes: Router = Router();
  constructor(private authController: IAuthController) {
    this.init();
  }
  public get userRoutes() {
    return this.authRoutes;
  }
  private init() {
    this.authRoutes.post("/signup", (req, res) => {
      this.authController.signup(req, res);
    });
    this.authRoutes.post("/login", (req, res) => {
      this.authController.login(req, res);
    });
    this.authRoutes.get("/activate-account", (req, res) => {
      this.authController.activateAccount(req, res);
    });
    this.authRoutes.post("/request-reset-password", (req, res) => {
      this.authController.sendPasswordResetEmail(req, res);
    });
    
    this.authRoutes.post("/reset-password", (req, res) => {
      this.authController.resetPassword(req, res);
    });
    this.authRoutes.get('/login/google', passport.authenticate('google'));
  }
}
