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
exports.IngredientRepository = void 0;
const mongoose_1 = require("mongoose");
const ingredient_schema_1 = require("../model/ingredient.schema");
const InvalidObjectIdError_1 = require("../../../errors/InvalidObjectIdError");
const NotFoundError_1 = require("../../../errors/NotFoundError");
class IngredientRepository {
    /**
     *
     */
    constructor() { }
    create(ingredient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientRepo: creating an ingredient");
                const ing = yield ingredient_schema_1.Ingredient.create(ingredient);
                console.info("IngredientRepo: an ingredient is created");
                return ing;
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
                console.info("IngredientRepo: getting an ingredient");
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const ing = yield ingredient_schema_1.Ingredient.findById(id);
                if (ing == null) {
                    throw new NotFoundError_1.NotFoundError("Ingredient is not found");
                }
                console.info("IngredientRepo: ingredients is found ");
                return ing;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientRepo: getting All ingredient");
                const ings = yield ingredient_schema_1.Ingredient.find();
                console.info("IngredientRepo: All ingredients are found ");
                return ings;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    update(id, ingredient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info("IngredientRepo: updating an ingredient");
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const ing = yield ingredient_schema_1.Ingredient.findByIdAndUpdate(id, ingredient, { new: true });
                if (ing == null) {
                    throw new NotFoundError_1.NotFoundError("Ingredient is not found");
                }
                console.info("IngredientRepo: ingredient is updated");
                return ing;
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
                console.info("IngredientRepo: deleting an ingredient");
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new InvalidObjectIdError_1.InvalidObjectIdError();
                }
                const ing = yield ingredient_schema_1.Ingredient.findByIdAndDelete(id);
                if (ing == null) {
                    throw new NotFoundError_1.NotFoundError("Ingredient is not found");
                }
                console.info("IngredientRepo: ingredient is deleted");
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.IngredientRepository = IngredientRepository;
