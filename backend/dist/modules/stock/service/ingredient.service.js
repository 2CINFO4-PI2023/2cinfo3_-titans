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
exports.IngredientService = void 0;
class IngredientService {
    /**
     *
     */
    constructor(ingredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }
    createIngredient(ingredient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientService: creating an ingredient");
                return yield this.ingredientRepo.create(ingredient);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getIngredient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientService: getting an ingredient");
                return yield this.ingredientRepo.get(id);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getAllIngredient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientService: getting all an ingredient");
                return yield this.ingredientRepo.getAll();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateIngredient(id, ingredient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientService: updating an ingredient");
                return yield this.ingredientRepo.update(id, ingredient);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deleteIngredient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientService: deleting an ingredient");
                yield this.ingredientRepo.delete(id);
                console.info("IngredientService: an ingredientis deleted");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    outOfStock() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientService:starting treatement ingredient out of stock");
                const ingredients = yield this.ingredientRepo.getAll();
                let outOfStockIngredient = new Array;
                for (const ingredient of ingredients) {
                    if (ingredient.quantity < 10) {
                        outOfStockIngredient.push(ingredient);
                    }
                }
                console.info("IngredientService:treatement ingredient out of stock is done");
                return outOfStockIngredient;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.IngredientService = IngredientService;
