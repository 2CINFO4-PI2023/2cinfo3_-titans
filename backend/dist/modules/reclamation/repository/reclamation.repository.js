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
exports.ReclamationRepository = void 0;
const DuplicatedError_1 = require("../../../errors/DuplicatedError");
const reclamation_schema_1 = require("../model/reclamation.schema");
class ReclamationRepository {
    constructor() { }
    create(reclamation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield reclamation_schema_1.Reclamation.create(reclamation);
                return doc;
            }
            catch (error) {
                if (error.code === 11000) {
                    // Handle duplicate key error
                    throw new DuplicatedError_1.DuplicatedError("Reclamation already exists");
                }
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield reclamation_schema_1.Reclamation.findById(id);
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield reclamation_schema_1.Reclamation.find();
                return docs;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reclamation_schema_1.Reclamation.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, reclamation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield reclamation_schema_1.Reclamation.findByIdAndUpdate(id, reclamation);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ReclamationRepository = ReclamationRepository;
