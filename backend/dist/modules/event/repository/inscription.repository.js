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
exports.InscriptionRepository = void 0;
const inscription_schema_1 = require("../model/inscription.schema");
const event_schema_1 = require("../model/event.schema");
const user_schema_1 = require("../../user/model/user.schema");
class InscriptionRepository {
    constructor() { }
    create(inscription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield inscription_schema_1.Inscription.create(inscription);
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield inscription_schema_1.Inscription.findById(id);
                return doc;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield inscription_schema_1.Inscription.find();
                return docs;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, inscription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedInscription = yield inscription_schema_1.Inscription.findByIdAndUpdate(id, inscription, { new: true });
                return updatedInscription;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield inscription_schema_1.Inscription.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_schema_1.Event.findById(id);
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.User.findById(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.InscriptionRepository = InscriptionRepository;
