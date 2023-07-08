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
exports.InscriptionController = void 0;
class InscriptionController {
    constructor(inscriptionService) {
        this.inscriptionService = inscriptionService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscription = req.body;
                const data = yield this.inscriptionService.createInscription(inscription);
                res.status(201).json(data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const inscription = yield this.inscriptionService.getInscription(id);
                if (!inscription) {
                    return res.status(404).json({ message: "Inscription not found" });
                }
                res.json(inscription);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inscriptions = yield this.inscriptionService.getAllInscriptions();
                res.json(inscriptions);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.inscriptionService.deleteInscription(id);
                res.json({ message: "Inscription deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.inscriptionService.getUserById(id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.InscriptionController = InscriptionController;
