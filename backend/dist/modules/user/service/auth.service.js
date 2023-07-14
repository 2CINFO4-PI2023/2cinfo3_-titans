"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.ROLES = void 0;
const bcrypt_1 = require("bcrypt");
const fs_1 = require("fs");
const NotFoundError_1 = require("../../../errors/NotFoundError");
const UnauthorizedError_1 = require("../../../errors/UnauthorizedError");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const tokenHelper_1 = require("../../../helpers/tokenHelper");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
var FacebookStrategy = require("passport-facebook");
var ROLES;
(function (ROLES) {
    ROLES[ROLES["ADMIN"] = 99] = "ADMIN";
    ROLES[ROLES["CLIENT"] = 1] = "CLIENT";
})(ROLES || (exports.ROLES = ROLES = {}));
class AuthService {
    constructor(userService, mailNotifier, tokenRepositoy) {
        this.userService = userService;
        this.mailNotifier = mailNotifier;
        this.tokenRepositoy = tokenRepositoy;
    }
    signup(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userData = data;
                userData.role = ROLES.CLIENT;
                const user = yield this.userService.createUser(userData);
                const token = (0, tokenHelper_1.generateRandomToken)();
                const content = (0, fs_1.readFileSync)("dist/confirmation.html", "utf8").toString();
                const modifiedContent = content.replace(/\[TOKEN\]/g, token);
                this.tokenRepositoy.set(token, (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString(), 60 * 30);
                this.mailNotifier.sendMail(user.email, modifiedContent, "Account activation");
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findByEmail(credentials.email);
                const result = yield (0, bcrypt_1.compare)(credentials.password, user.password);
                if (!result) {
                    throw new UnauthorizedError_1.UnauthorizedError("invalid credentials");
                }
                if (!user.confirmed) {
                    throw new UnauthorizedError_1.UnauthorizedError("Account not confirmed");
                }
                const jwt = (0, jwtHelper_1.generateAccessToken)({ user });
                return jwt;
            }
            catch (error) {
                if (error instanceof NotFoundError_1.NotFoundError) {
                    throw new UnauthorizedError_1.UnauthorizedError("invalid credentials");
                }
                throw error;
            }
        });
    }
    activateUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield this.tokenRepositoy.get(token);
                if (!id) {
                    throw new NotFoundError_1.NotFoundError("email not found");
                }
                const user = this.userService.getUser(id);
                user.confirmed = true;
                this.userService.updateUser(id, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendPasswordResetEmail(email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO set frontend url of reset password page
                const user = yield this.userService.findByEmail(email);
                const otp = (0, tokenHelper_1.generateOTP)();
                const content = (0, fs_1.readFileSync)("dist/reset_password.html", "utf8").toString();
                // modifiedContent = content.replace(/\[TOKEN\]/g, resetToken);
                this.tokenRepositoy.set(otp, (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString(), 60 * 10);
                this.mailNotifier.sendMail(user.email, otp, "Reset password");
            }
            catch (error) {
                throw error;
            }
        });
    }
    resetPassword(otp, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield this.tokenRepositoy.get(otp);
                if (!id) {
                    throw new NotFoundError_1.NotFoundError("otp expired");
                }
                const user = this.userService.getUser(id);
                user.password = newPassword;
                this.userService.updateUser(id, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    googleAuth() {
        try {
            const self = this;
            passport.use(new GoogleStrategy({
                clientID: process.env["GOOGLE_CLIENT_ID"],
                clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
                callbackURL: "http://localhost:9090/auth/google/callback",
                scope: ["profile", "email"],
            }, function verify(issuer, profile, cb) {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = yield self.userService.findByEmail((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value);
                        return cb(null, user);
                    }
                    catch (error) {
                        if (error instanceof NotFoundError_1.NotFoundError) {
                            yield self.userService.createUser({
                                name: profile.displayName,
                                email: (_b = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _b === void 0 ? void 0 : _b.value,
                                phone: "",
                                address: "",
                                confirmed: true,
                                role: ROLES.CLIENT,
                                favoritePlat: []
                            });
                        }
                        else {
                            cb(error);
                        }
                    }
                });
            }));
            passport.serializeUser(function (user, cb) {
                process.nextTick(function () {
                    cb(null, { id: user.id, username: user.username, name: user.name });
                });
            });
            passport.deserializeUser(function (user, cb) {
                process.nextTick(function () {
                    return cb(null, user);
                });
            });
            return passport;
        }
        catch (error) {
            console.log("global catch");
        }
    }
    facebookAuth() {
        const self = this;
        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:9090/auth/facebook/callback",
            state: true,
            profileFields: ['displayName', 'email']
        }, function (accessToken, refreshToken, profile, cb) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield self.userService.findByEmail(profile.email || "facebook@login.com");
                    return cb(null, user);
                }
                catch (error) {
                    if (error instanceof NotFoundError_1.NotFoundError) {
                        const user = yield self.userService.createUser({
                            name: profile.displayName,
                            email: profile.email || "facebook@login.com",
                            phone: "",
                            address: "",
                            confirmed: true,
                            role: ROLES.CLIENT,
                            favoritePlat: []
                        });
                        return cb(null, user);
                    }
                    else {
                        cb(error);
                    }
                }
            });
        }));
        passport.serializeUser(function (user, cb) {
            process.nextTick(function () {
                cb(null, { id: user.id, username: user.username, name: user.name });
            });
        });
        passport.deserializeUser(function (user, cb) {
            process.nextTick(function () {
                return cb(null, user);
            });
        });
        return passport;
    }
    createAdmin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userService.createAdmin(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    refreshToken(token) {
        try {
            const decoded = (0, jwtHelper_1.decodeAccessToken)(token);
            const accessToken = (0, jwtHelper_1.generateAccessToken)({ user: decoded.user });
            return accessToken;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AuthService = AuthService;
