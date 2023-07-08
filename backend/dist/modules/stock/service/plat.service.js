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
exports.PlatService = void 0;
const insufficientStockError_1 = require("../../../errors/insufficientStockError");
const nutrition_apiUtils_1 = require("../../../utils/nutrition.apiUtils");
class PlatService {
    /**
     *
     */
    constructor(platRepo, ingredientRepo) {
        this.platRepo = platRepo;
        this.ingredientRepo = ingredientRepo;
    }
    createPlat(plat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: creating plat");
                return yield this.platRepo.create(plat);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getPlat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: getting a plat");
                return yield this.platRepo.get(id);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getAllPlat() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: getting all plat");
                return yield this.platRepo.getAll();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updatePlat(id, plat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: updating plat");
                return yield this.platRepo.update(id, plat);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deletePlat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: deleting plat");
                yield this.platRepo.delete(id);
                console.info("PlatService: plat is deleted");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    commandPlat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: commanding plat");
                const plat = yield this.getPlat(id);
                for (const [key, value] of (yield plat).ingredients) {
                    const ingredient = yield this.ingredientRepo.get(key);
                    ingredient.quantity -= value;
                    if (ingredient.quantity < 0)
                        throw new insufficientStockError_1.InsufficientStockError();
                    yield this.ingredientRepo.update(key, ingredient);
                }
                console.info("PlatService: plat is commanded");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    calculCalories(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("PlatService: calculation calories of a plat");
                const plat = yield this.getPlat(id);
                let query = "";
                for (const [key, value] of plat.ingredients) {
                    const ingredient = yield this.ingredientRepo.get(key);
                    query += value + ' ' + ingredient.name + ' ';
                }
                const nutritionData = yield (0, nutrition_apiUtils_1.fetchNutritionData)(query);
                console.info("PlatService: plat calories are calculated");
                return nutritionData;
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
                console.info("PlatService: getting the latest plat");
                return yield this.platRepo.getlatestPlat();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.PlatService = PlatService;
