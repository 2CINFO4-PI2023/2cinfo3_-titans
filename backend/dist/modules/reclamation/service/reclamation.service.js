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
const NotFoundError_1 = require("../../../errors/NotFoundError");
const statut_schema_1 = require("../../statut/model/statut.schema");
class ReclamationService {
    constructor(reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }
    createReclamation(reclamation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { statut } = reclamation;
                // Check if the type exists in the Statut collection
                // const existingType = await Statut.findById(statut);
                //  if (!existingType) {
                //   throw new NotFoundError("Invalid type provided.");
                // }
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
                const reclamation = yield this.reclamationRepository.get(id);
                const statut = yield statut_schema_1.Statut.findById(reclamation === null || reclamation === void 0 ? void 0 : reclamation.statut);
                if (statut == null)
                    throw new NotFoundError_1.NotFoundError("Statut Not  Found !");
                return reclamation;
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
    populateType(typeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = yield statut_schema_1.Statut.findById(typeId);
                return type;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ReclamationService = ReclamationService;
