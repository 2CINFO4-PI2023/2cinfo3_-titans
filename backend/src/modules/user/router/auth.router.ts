import { Router } from "express";
import { AuthController, IAuthController } from "../controller/auth.controller";
import passport from "passport";
import { authenticateAdmin } from "../../../middlewares/authMiddleware";
var GoogleStrategy = require("passport-google-oidc");

export class AuthRouter {
  private authRoutes: Router = Router();
  constructor(private authController: AuthController) {
    this.init();
  }
  public get userRoutes() {
    return this.authRoutes;
  }
  googleAuth() {
    console.log("googleAuth function");
    const self = this;
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env["GOOGLE_CLIENT_ID"],
          clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
          callbackURL: "http://localhost:9090/auth/google/callback",
          scope: ["profile", "email"],
        },
        function verify(issuer: any, profile: any, cb: any) {
          try {
            console.log("profile: ", profile);
            // const user = self.userService.findByEmail(profile.email)
            return cb(null, { name: profile.name });
          } catch (error) {
            console.log("error", error);
            // if (error instanceof NotFoundError){
            //   self.userService.createUser({
            //     name: profile.displayName,
            //     email: profile.email,
            //     phone: "",
            //     address: "",
            //     confirmed: true,
            //     role: ROLES.CLIENT
            //   })
            // }else{
            //   cb(error)
            // }
            cb(error);
          }
        }
      )
    );
    passport.serializeUser(function (user: any, cb: any) {
      process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
      });
    });

    passport.deserializeUser(function (user: any, cb: any) {
      process.nextTick(function () {
        return cb(null, user);
      });
    });
    return passport;
  }
  private init() {

    this.authController.authProvider.googleAuth();
    this.authController.authProvider.facebookAuth();

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

    this.authRoutes.get("/oauth-redirection", (req, res) => {
      this.authController.oAuthRedirection(req, res);
    });

    this.authRoutes.get(
      "/google/callback",
      passport.authenticate("google", {
        successRedirect: "/auth/oauth-redirection?state=GOOD",
        failureRedirect: "/auth/oauth-redirection?state=BAD",
      })
    );

    this.authRoutes.get(
      "/facebook/callback",
      passport.authenticate("facebook", { failureRedirect: "/auth/oauth-redirection?state=BAD" }),
      function (req, res) {
        res.redirect("/auth/oauth-redirection?state=GOOD");
      }
    );

    this.authRoutes.get("/login/google", passport.authenticate("google"));
    this.authRoutes.get("/login/facebook", passport.authenticate("facebook"));
    
    this.authRoutes.post('/create-admin',authenticateAdmin,(req,res)=>{
      this.authController.createAdmin(req,res)
    })
  }
}
