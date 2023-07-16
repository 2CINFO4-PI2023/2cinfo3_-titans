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
exports.CommandeService = void 0;
const fs_1 = require("fs");
const user_repository_1 = require("../../user/repository/user.repository");
class CommandeService {
    constructor(commandeRepository, mailNotifier) {
        this.commandeRepository = commandeRepository;
        this.mailNotifier = mailNotifier;
        this.userRepo = new user_repository_1.UserRepository;
    }
    createCommande(commande) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.commandeRepository.create(commande);
                const user = yield this.userRepo.get(response === null || response === void 0 ? void 0 : response.user);
                const confirmationContent = (0, fs_1.readFileSync)("dist/commande_confirmation.html", "utf8").toString();
                // Modify the email content as needed
                this.mailNotifier.sendMail(user === null || user === void 0 ? void 0 : user.email, confirmationContent, "commande Confirmation");
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCommande(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.commandeRepository.get(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    allCommandes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.commandeRepository.all();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCommande(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.commandeRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCommande(id, commande) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.commandeRepository.update(id, commande);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CommandeService = CommandeService;
