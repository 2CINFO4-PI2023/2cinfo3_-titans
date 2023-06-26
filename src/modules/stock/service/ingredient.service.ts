import { IIngredient } from "../model/ingredient.schema";
import { IIngredientRepository } from "../repository/ingredient.repository";


export interface IIngredientService {
    createIngredient(ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    getIngredient(id: string): IIngredient | Promise<IIngredient>;
    getAllIngredient(): IIngredient[] | Promise<IIngredient[]>;
    updateIngredient(id: string, ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    deleteIngredient(id: string): void;
}

export class IngredientService implements IIngredientService {
    /**
     *
     */
    constructor(private ingredientRepo: IIngredientRepository) { }
    async createIngredient(ingredient: IIngredient): Promise<IIngredient> {
        try {
            console.info("IngredientService: creating an ingredient");
            return await this.ingredientRepo.create(ingredient);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getIngredient(id: string): Promise<IIngredient> {
        try {
            console.info("IngredientService: getting an ingredient");
            return await this.ingredientRepo.get(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllIngredient(): Promise<IIngredient[]> {
        try {
            console.info("IngredientService: getting all an ingredient");
            return await this.ingredientRepo.getAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async updateIngredient(id: string, ingredient: IIngredient): Promise<IIngredient> {
        try {
            console.info("IngredientService: updating an ingredient");
            return await this.ingredientRepo.update(id, ingredient);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteIngredient(id: string) {
        try {
            console.info("IngredientService: deleting an ingredient");
            await this.ingredientRepo.delete(id);
            console.info("IngredientService: an ingredientis deleted");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}