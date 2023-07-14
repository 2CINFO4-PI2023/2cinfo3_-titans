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
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const fs_1 = require("../../../helpers/fs");
const auth_service_1 = require("./auth.service");
class UserService {
    constructor(userRepository, platRepo) {
        this.userRepository = userRepository;
        this.platRepo = platRepo;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user.password) {
                    const hashedPassword = yield (0, bcrypt_1.hash)(user.password, 10);
                    user.password = hashedPassword;
                }
                user.role = auth_service_1.ROLES.CLIENT;
                user.confirmed = true;
                return yield this.userRepository.create(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createAdmin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user.password) {
                    const hashedPassword = yield (0, bcrypt_1.hash)(user.password, 10);
                    user.password = hashedPassword;
                }
                user.role = auth_service_1.ROLES.ADMIN;
                user.confirmed = true;
                return yield this.userRepository.create(user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.get(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.all();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.delete(id);
                if (user.image) {
                    (0, fs_1.deleteFile)(user.image);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.userRepository.get(id);
                if (doc.image != user.image && user.image != undefined) {
                    (0, fs_1.deleteFile)(user.image);
                }
                if (user.password) {
                    const hashedPassword = yield (0, bcrypt_1.hash)(user.password, 10);
                    user.password = hashedPassword;
                }
                return yield this.userRepository.update(id, user);
            }
            catch (error) {
                console.log("error: ", error);
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findByEmail(email);
            }
            catch (error) {
                throw error;
            }
        });
    }
    favoritePlat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("trying to get favorite plates");
                const user = yield this.userRepository.get(id);
                let favPlats = new Array;
                for (const platid of user.favoritePlat) {
                    const plat = yield this.platRepo.get(platid);
                    console.log(plat);
                    favPlats.push(plat);
                }
                console.log(favPlats);
                console.info("returned favorite plates");
                return favPlats;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addPlatToFavorite(userId, platId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("trying to add to favorite plate");
                const user = yield this.userRepository.get(userId);
                let duplicatedPlat = false;
                for (const platid of user.favoritePlat) {
                    if (platid == platId) {
                        duplicatedPlat = true;
                        break;
                    }
                }
                if (!duplicatedPlat) {
                    user.favoritePlat.push(platId);
                    console.info("favorite plate added into the list");
                }
                else {
                    const index = user.favoritePlat.indexOf(platId);
                    if (index !== -1) {
                        user.favoritePlat.splice(index, 1);
                        console.info("favorite plate deleted from the list");
                    }
                }
                this.userRepository.update(userId, user);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
