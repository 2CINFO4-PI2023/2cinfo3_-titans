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
exports.ReclamationController = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
const user_schema_1 = require("../../user/model/user.schema");
class ReclamationController {
    constructor(reclamationService) {
        this.reclamationService = reclamationService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield user_schema_1.User.findById(id);
                const reclamation = req.body;
                reclamation.user = user;
                const data = yield this.reclamationService.createReclamation(reclamation);
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
                const reclamation = yield this.reclamationService.getReclamation(id);
                if (!reclamation) {
                    return res.status(404).json({ message: "Reclamation not found" });
                }
                res.json(reclamation);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reclamations = yield this.reclamationService.allReclamations();
                res.json(reclamations);
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
                const reclamation = req.body;
                yield this.reclamationService.updateReclamation(id, reclamation);
                res.json({ message: "Reclamation updated successfully" });
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
                yield this.reclamationService.deleteReclamation(id);
                res.json({ message: "Reclamation deleted successfully" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.ReclamationController = ReclamationController;
