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
exports.StatutService = void 0;
const reclamation_schema_1 = require("../../reclamation/model/reclamation.schema");
class StatutService {
    constructor(statutRepository) {
        this.statutRepository = statutRepository;
    }
    createStatut(statut) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.statutRepository.create(statut);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStatut(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.statutRepository.get(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    allStatuts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.statutRepository.all();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteStatut(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reclamations = yield reclamation_schema_1.Reclamation.find();
                console.log(reclamations);
                yield this.statutRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateStatut(id, statut) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.statutRepository.update(id, statut);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOrCreateNewStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.statutRepository.findOrCreateNewStatus();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.StatutService = StatutService;
