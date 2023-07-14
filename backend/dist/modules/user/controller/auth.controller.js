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
exports.AuthController = void 0;
const HTTPError_1 = require("../../../errors/HTTPError");
const InvalidBodyError_1 = require("../../../errors/InvalidBodyError");
const loginSchema_1 = require("./schema/loginSchema");
const signupSchema_1 = require("./schema/signupSchema");
const passport = require("passport");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    get authProvider() {
        return this.authService;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Object.keys(req.body).length === 0) {
                    throw new InvalidBodyError_1.InvalidBodyError("Empty body");
                }
                const { error } = signupSchema_1.signupSchema.validate(req.body);
                if (error) {
                    throw new InvalidBodyError_1.InvalidBodyError(error.details[0].message);
                }
                const data = yield this.authService.signup(req.body);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Object.keys(req.body).length === 0) {
                    throw new InvalidBodyError_1.InvalidBodyError("Empty body");
                }
                const { error } = loginSchema_1.loginSchema.validate(req.body);
                if (error) {
                    throw new InvalidBodyError_1.InvalidBodyError(error.details[0].message);
                }
                const accessToken = yield this.authService.login(req.body);
                res.status(200).json({ accessToken });
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
    activateAccount(req, res) {
        try {
            const token = req.query.token;
            this.authService.activateUser(token);
            res.sendStatus(204);
        }
        catch (error) {
            if (error instanceof HTTPError_1.HTTPError) {
                return res
                    .status(error.http_code)
                    .json({ message: error.message, description: error.description });
            }
            res.status(500).send(error);
        }
    }
    sendPasswordResetEmail(req, res) {
        try {
            const email = req.body.email;
            this.authService.sendPasswordResetEmail(email);
            return res.sendStatus(204);
        }
        catch (error) {
            if (error instanceof HTTPError_1.HTTPError) {
                return res
                    .status(error.http_code)
                    .json({ message: error.message, description: error.description });
            }
            res.status(500).send(error);
        }
    }
    resetPassword(req, res) {
        try {
            const otp = req.body.otp;
            const newPassword = req.body.newPassword;
            this.authService.resetPassword(otp, newPassword);
            return res.sendStatus(204);
        }
        catch (error) {
            if (error instanceof HTTPError_1.HTTPError) {
                return res
                    .status(error.http_code)
                    .json({ message: error.message, description: error.description });
            }
            res.status(500).send(error);
        }
    }
    oAuthRedirection(req, res) {
        const status = req.query.state == "GOOD" ? 200 : 401;
        res.status(status).send({ message: status == 200 ? "OK" : "Login failed" });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield this.authService.createAdmin(data);
                return res.status(200).send(user);
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refreshToken;
                if (!refreshToken) {
                    return res.status(400).json({ error: "Refresh token is required" });
                }
                const accessToken = this.authService.refreshToken(refreshToken);
                res.status(200).json({ accessToken });
            }
            catch (error) {
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                console.log(error);
                res.status(500).send(error);
            }
        });
    }
}
exports.AuthController = AuthController;
