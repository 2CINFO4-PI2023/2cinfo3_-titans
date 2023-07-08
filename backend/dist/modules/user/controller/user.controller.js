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
exports.UserController = void 0;
const HTTPError_1 = require("../../../errors/HTTPError");
const createSchema_1 = require("./schema/createSchema");
const InvalidBodyError_1 = require("../../../errors/InvalidBodyError");
const updateUserSchema_1 = require("./schema/updateUserSchema");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                let imageUrl;
                if (Object.keys(user).length === 0) {
                    throw new InvalidBodyError_1.InvalidBodyError("Empty body");
                }
                const { error } = createSchema_1.createUserSchema.validate(req.body);
                if (error) {
                    throw new InvalidBodyError_1.InvalidBodyError(error.details[0].message);
                }
                if (req.file) {
                    imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
                    user.image = imageUrl;
                }
                const data = yield this.userService.createUser(user);
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
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.allUsers();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.userService.getUser(req.params.id);
                res.status(200).json(data);
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
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.deleteUser(req.params.id);
                return res.status(204).send();
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("update");
                const body = req.body;
                if (Object.keys(body).length === 0) {
                    throw new InvalidBodyError_1.InvalidBodyError("Empty body");
                }
                const { error } = updateUserSchema_1.updateUserSchema.validate(body);
                if (error) {
                    throw new InvalidBodyError_1.InvalidBodyError(error.details[0].message);
                }
                let imageUrl;
                if (req.file) {
                    imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
                    body.image = imageUrl;
                }
                const user = yield this.userService.updateUser(req.params.id, body);
                return res.status(200).send(user);
            }
            catch (error) {
                console.log("error: ", error);
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    favoritePlat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plats = yield this.userService.favoritePlat(req.params.id);
                res.status(200).json(plats);
            }
            catch (error) {
                console.log(error);
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    addPlatToFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userService.addPlatToFavorite(req.params.id, req.params.platId);
                const user = this.userService.getUser(req.params.id);
                return res.status(200).send(user);
            }
            catch (error) {
                console.log(error);
                if (error instanceof HTTPError_1.HTTPError) {
                    return res
                        .status(error.http_code)
                        .json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
}
exports.UserController = UserController;
