"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
var GoogleStrategy = require("passport-google-oidc");
class AuthRouter {
    constructor(authController) {
        this.authController = authController;
        this.authRoutes = (0, express_1.Router)();
        this.init();
    }
    get userRoutes() {
        return this.authRoutes;
    }
    googleAuth() {
        console.log("googleAuth function");
        const self = this;
        passport_1.default.use(new GoogleStrategy({
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
            callbackURL: "http://localhost:9090/auth/google/callback",
            scope: ["profile", "email"],
        }, function verify(issuer, profile, cb) {
            try {
                console.log("profile: ", profile);
                // const user = self.userService.findByEmail(profile.email)
                return cb(null, { name: profile.name });
            }
            catch (error) {
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
        }));
        passport_1.default.serializeUser(function (user, cb) {
            process.nextTick(function () {
                cb(null, { id: user.id, username: user.username, name: user.name });
            });
        });
        passport_1.default.deserializeUser(function (user, cb) {
            process.nextTick(function () {
                return cb(null, user);
            });
        });
        return passport_1.default;
    }
    init() {
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
        this.authRoutes.get("/google/callback", passport_1.default.authenticate("google", {
            successRedirect: "/auth/oauth-redirection?state=GOOD",
            failureRedirect: "/auth/oauth-redirection?state=BAD",
        }));
        this.authRoutes.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/auth/oauth-redirection?state=BAD" }), function (req, res) {
            res.redirect("/auth/oauth-redirection?state=GOOD");
        });
        this.authRoutes.get("/login/google", passport_1.default.authenticate("google"));
        this.authRoutes.get("/login/facebook", passport_1.default.authenticate("facebook"));
        this.authRoutes.post('/create-admin', authMiddleware_1.authenticateAdmin, (req, res) => {
            this.authController.createAdmin(req, res);
        });
    }
}
exports.AuthRouter = AuthRouter;
