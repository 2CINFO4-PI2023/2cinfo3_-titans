import { InsufficientStockError } from "../../../errors/insufficientStockError";
import { IPlat } from "../model/plat.schema";
import { IIngredientRepository } from "../repository/ingredient.repository";
import { IPlatRepository } from "../repository/plat.repository";
import { fetchNutritionData } from "../../../utils/nutrition.apiUtils";
import { INutritionBody } from "../Dto/INutritionBody";
import { Notifier } from "../../../notifiers/notification.service";
import { IIngredientService } from "./ingredient.service";



export interface IPlatService {
    createPlat(plat: IPlat): IPlat | Promise<IPlat>;
    getPlat(id: string): IPlat | Promise<IPlat>;
    getPlatWithIngredients(id: string): IPlat | Promise<IPlat>;
    getAllPlatWithIngredients(): IPlat[] | Promise<IPlat[]>;
    getAllPlat(): IPlat[] | Promise<IPlat[]>;
    updatePlat(id: string, plat: IPlat): IPlat | Promise<IPlat>;
    deletePlat(id: string): void;
    commandPlat(id: string): void;
    calculCalories(id: string): INutritionBody[] | Promise<INutritionBody[]>;
    getlatestPlat(): IPlat[] | Promise<IPlat[]>;
}

export class PlatService implements IPlatService {
    /**
     *
     */
    constructor(private platRepo: IPlatRepository, private ingredientRepo: IIngredientRepository, private notifier:Notifier,private ingredientService: IIngredientService) { }
    async createPlat(plat: IPlat): Promise<IPlat> {
        try {
            console.info("PlatService: creating plat");
            return await this.platRepo.create(plat);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPlat(id: string): Promise<IPlat> {
        try {
            console.info("PlatService: getting a plat");
            return await this.platRepo.get(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPlatWithIngredients(id: string): Promise<IPlat> {
        try {
            console.info("PlatService: getting a plat");
            let ingredients: Map<string, number> = new Map<string,number>();
            
            let plat =  await this.platRepo.get(id);
            for (const [key, value] of (await plat).ingredients) {
                const ingredient = await this.ingredientRepo.get(key);
                ingredients.set(ingredient.name,value);
            }
            plat.ingredients = ingredients;
            return plat;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllPlat(): Promise<IPlat[]> {
        try {
            console.info("PlatService: getting all plat");
            return await this.platRepo.getAll();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAllPlatWithIngredients(): Promise<IPlat[]> {
        try {
            console.info("PlatService: getting all plat");
            let plats = await this.platRepo.getAll();
            for(const plat of plats){
                let ingredients: Map<string, number> = new Map<string,number>();
                for (const [key, value] of (await plat).ingredients) {
                    const ingredient = await this.ingredientRepo.get(key);
                    ingredients.set(ingredient.name,value);
                }
                plat.ingredients = ingredients;
            }
            return plats;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async updatePlat(id: string, plat: IPlat): Promise<IPlat> {
        try {
            console.info("PlatService: updating plat");
            return await this.platRepo.update(id, plat);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deletePlat(id: string) {
        try {
            console.info("PlatService: deleting plat");
            await this.platRepo.delete(id);
            console.info("PlatService: plat is deleted");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async commandPlat(id: string) {
        try {
            console.info("PlatService: commanding plat");
            const plat = await this.getPlat(id);
            for (const [key, value] of (await plat).ingredients) {
                const ingredient = await this.ingredientRepo.get(key);
                ingredient.quantity -= value;
                const data = this.ingredientService.outOfStock();
                if(data)
                this.notifier.push(data);
                if (ingredient.quantity < 0) throw new InsufficientStockError();
                await this.ingredientRepo.update(key, ingredient);
            }
            console.info("PlatService: plat is commanded");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async calculCalories(id: string): Promise<INutritionBody[]>{
        try {
            console.info("PlatService: calculation calories of a plat");
            const plat = await this.getPlat(id);
            let query: string = "";
            for (const [key, value] of plat.ingredients) {
                const ingredient = await this.ingredientRepo.get(key);
                query += value + ' ' + ingredient.name + ' ';
            }
            const nutritionData = await fetchNutritionData(query);
            console.info("PlatService: plat calories are calculated");
            return nutritionData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getlatestPlat(): Promise<IPlat[]> {
        try {
            console.info("PlatService: getting the latest plat");
            return await this.platRepo.getlatestPlat();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}