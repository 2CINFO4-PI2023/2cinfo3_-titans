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
exports.ReclamationService = void 0;
class ReclamationService {
    constructor(reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }
    createReclamation(reclamation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.reclamationRepository.create(reclamation);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getReclamation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.reclamationRepository.get(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    allReclamations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.reclamationRepository.all();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteReclamation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reclamationRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateReclamation(id, reclamation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.reclamationRepository.update(id, reclamation);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ReclamationService = ReclamationService;
