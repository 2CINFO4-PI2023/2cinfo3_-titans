import { IIngredient } from "../model/ingredient.schema";
import { IIngredientRepository } from "../repository/ingredient.repository";


export interface IIngredientService{
    createIngredient(ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    getIngredient(id: string): IIngredient | Promise<IIngredient>;
    getAllIngredient(): IIngredient[] | Promise<IIngredient[]>;
    updateIngredient(id: string, ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    deleteIngredient(id: string): void;
}

export class IngredientService implements IIngredientService{
    /**
     *
     */
    constructor(private ingredientRepo: IIngredientRepository) {}
    async createIngredient(ingredient: IIngredient): Promise<IIngredient> {
        try {
            return await this.ingredientRepo.create(ingredient);
        } catch (error) {
            throw error;
        }
    }
    async getIngredient(id: string): Promise<IIngredient> {
        try {
            return await this.ingredientRepo.get(id);
        } catch (error) {
            throw error;
        }
    }
    async getAllIngredient(): Promise<IIngredient[]> {
        try {
            return await this.ingredientRepo.getAll();
        } catch (error) {
            throw error;
        }
    }
    async updateIngredient(id: string, ingredient: IIngredient):Promise<IIngredient> {
        try {
            return await this.ingredientRepo.update(id,ingredient);
        } catch (error) {
            throw error;
        }
    }
    async deleteIngredient(id: string) {
        try {
            await this.ingredientRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }
    
}