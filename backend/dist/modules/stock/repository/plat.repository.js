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
exports.PlatRepository = void 0;
const mongoose_1 = require("mongoose");
const plat_schema_1 = require("../model/plat.schema");
const InvalidObjectIdError_1 = require("../../../errors/InvalidObjectIdError");
const NotFoundError_1 = require("../../../errors/NotFoundError");
class PlatRepository {
    /**
     *
     */
    constructor() { }
    create(plat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatRepo: creating plat");
                const plate = yield plat_schema_1.Plat.create(plat);
                console.info("PlatRepo: plat is created");
                return plate;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatRepo: getting plat");
                if (!(0, mongoose_1.isValidObjectId)(id))
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                const plat = yield plat_schema_1.Plat.findById(id);
                if (plat == null)
                    throw new NotFoundError_1.NotFoundError("Plat is not found!");
                console.info("PlatRepo: plat is found");
                return plat;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatRepo: getting all plat");
                const plats = yield plat_schema_1.Plat.find();
                console.info("PlatRepo: All plats are found");
                return plats;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    update(id, plat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatRepo: updating plat");
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const plate = yield plat_schema_1.Plat.findByIdAndUpdate(id, plat, { new: true });
                if (plate == null) {
                    throw new NotFoundError_1.NotFoundError("Ingredient is not found");
                }
                console.info("PlatRepo: plat is updated");
                return plate;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatRepo: deleting plat");
                if (!(0, mongoose_1.isValidObjectId)(id))
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                const plat = yield plat_schema_1.Plat.findByIdAndDelete(id);
                console.info("PlatRepo: plat is deleted");
                if (plat == null)
                    throw new NotFoundError_1.NotFoundError("Plat is not found!");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getlatestPlat() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatRepo: getting latest plat");
                const plats = yield plat_schema_1.Plat.find().sort({ updatedAt: -1 }).limit(1).exec();
                if (plats == null)
                    throw new NotFoundError_1.NotFoundError("Plat is not found!");
                console.info("PlatRepo: latest plats is found");
                return plats;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.PlatRepository = PlatRepository;
