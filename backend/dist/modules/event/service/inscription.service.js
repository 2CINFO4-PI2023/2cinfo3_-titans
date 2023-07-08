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
exports.InscriptionService = void 0;
const fs_1 = require("fs");
class InscriptionService {
    constructor(inscriptionRepository, mailNotifier) {
        this.inscriptionRepository = inscriptionRepository;
        this.mailNotifier = mailNotifier;
    }
    createInscription(inscription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = inscription.eventId.toString(); // Convert eventId to string
                const userId = inscription.userId.toString(); // Convert userId to string
                const event = yield this.inscriptionRepository.getEventById(eventId);
                const user = yield this.inscriptionRepository.getUserById(userId);
                if (!event) {
                    throw new Error("Event not found.");
                }
                if (event.availablePlaces <= 0) {
                    const apologyContent = (0, fs_1.readFileSync)("dist/apology.html", "utf8").toString();
                    this.mailNotifier.sendMail(inscription.email, apologyContent, "Apology for Event Full");
                    throw new Error("Event is already full. Apology email sent.");
                }
                const doc = yield this.inscriptionRepository.create(inscription);
                const confirmationContent = (0, fs_1.readFileSync)("dist/event_confirmation.html", "utf8").toString();
                // Modify the email content as needed
                this.mailNotifier.sendMail(doc.email, confirmationContent, "Inscription Confirmation");
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getInscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inscriptionRepository.get(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllInscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inscriptionRepository.getAll();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteInscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.inscriptionRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.inscriptionRepository.getUserById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.InscriptionService = InscriptionService;
