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
exports.StatutController = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
class StatutController {
    constructor(statutService) {
        this.statutService = statutService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statut = req.body;
                const data = yield this.statutService.createStatut(statut);
                res.status(201).json(data);
            }
            catch (error) {
                if (error instanceof DuplicatedError_1.DuplicatedError) {
                    return res.status(error.http_code).json({ message: error.message, description: error.description });
                }
                res.status(500).send(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const statut = yield this.statutService.getStatut(id);
                if (!statut) {
                    return res.status(404).json({ message: "Statut not found" });
                }
                res.json(statut);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statuts = yield this.statutService.allStatuts();
                res.json(statuts);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const statut = req.body;
                yield this.statutService.updateStatut(id, statut);
                res.json({ message: "Statut updated successfully" });
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
                yield this.statutService.deleteStatut(id);
                res.json({ message: "Statut deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    findOrCreateNewStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStatus = yield this.statutService.findOrCreateNewStatus();
                res.json(newStatus);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.StatutController = StatutController;
