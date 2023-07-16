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
exports.LivraisonService = void 0;
const fs_1 = require("fs");
const user_repository_1 = require("../../user/repository/user.repository");
class LivraisonService {
    constructor(livraisonRepository, mailNotifier) {
        this.livraisonRepository = livraisonRepository;
        this.mailNotifier = mailNotifier;
        this.userRepo = new user_repository_1.UserRepository;
    }
    createLivraison(livraison) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.livraisonRepository.create(livraison);
                const user = yield this.userRepo.get((_a = response.commande) === null || _a === void 0 ? void 0 : _a.user);
                const confirmationContent = (0, fs_1.readFileSync)("dist/livraison_confirmation.html", "utf8").toString();
                // Modify the email content as needed
                this.mailNotifier.sendMail(user === null || user === void 0 ? void 0 : user.email, confirmationContent, "livraison Confirmation");
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLivraison(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.livraisonRepository.get(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    allLivraisons() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.livraisonRepository.all();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteLivraison(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.livraisonRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateLivraison(id, livraison) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.livraisonRepository.update(id, livraison);
                const confirmationContent = (0, fs_1.readFileSync)("dist/livraison_termine.html", "utf8").toString();
                const user = yield this.userRepo.get((_a = response.commande) === null || _a === void 0 ? void 0 : _a.user);
                // Modify the email content as needed
                if ((response === null || response === void 0 ? void 0 : response.deliveryStatus) === "delivered") {
                    this.mailNotifier.sendMail(user === null || user === void 0 ? void 0 : user.email, confirmationContent, "livraison terminé");
                }
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.LivraisonService = LivraisonService;
