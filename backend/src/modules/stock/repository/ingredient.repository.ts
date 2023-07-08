import { isValidObjectId } from "mongoose";
import { IIngredient, Ingredient } from "../model/ingredient.schema";
import { InvalidObjectIdError } from "../../../errors/InvalidObjectIdError";
import { NotFoundError } from "../../../errors/NotFoundError";


export interface IIngredientRepository {
    create(ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    get(id: string): IIngredient | Promise<IIngredient>;
    getAll(): IIngredient[] | Promise<IIngredient[]>;
    update(id: string, ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    delete(id: string): void;
}

export class IngredientRepository implements IIngredientRepository {
    /**
     *
     */
    constructor() { }
    async create(ingredient: IIngredient): Promise<IIngredient> {
        try {
            console.info("IngredientRepo: creating an ingredient");
            const ing = await Ingredient.create(ingredient);
            console.info("IngredientRepo: an ingredient is created");
            return ing;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }
    async get(id: string): Promise<IIngredient> {
        try {
            console.info("IngredientRepo: getting an ingredient");
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const ing = await Ingredient.findById(id);
            if (ing == null) {
                throw new NotFoundError("Ingredient is not found");
            }
            console.info("IngredientRepo: ingredients is found ");
            return ing;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getAll(): Promise<IIngredient[]> {
        try {
            console.info("IngredientRepo: getting All ingredient")
            const ings = await Ingredient.find();
            console.info("IngredientRepo: All ingredients are found ")
            return ings;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async update(id: string, ingredient: IIngredient): Promise<IIngredient> {
        try {
            console.info("IngredientRepo: updating an ingredient")
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const ing = await Ingredient.findByIdAndUpdate(id, ingredient, { new: true });
            if (ing == null) {
                throw new NotFoundError("Ingredient is not found");
            }
            console.info("IngredientRepo: ingredient is updated")
            return ing;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async delete(id: string) {
        try {
            console.info("IngredientRepo: deleting an ingredient")
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const ing = await Ingredient.findByIdAndDelete(id);
            if (ing == null) {
                throw new NotFoundError("Ingredient is not found");
            }
            console.info("IngredientRepo: ingredient is deleted")
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}