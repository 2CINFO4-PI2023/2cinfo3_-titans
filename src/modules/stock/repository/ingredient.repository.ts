import { isValidObjectId } from "mongoose";
import { IIngredient, Ingredient } from "../model/ingredient.schema";
import { InvalidObjectIdError } from "../../../errors/InvalidObjectIdError";
import { NotFoundError } from "../../../errors/NotFoundError";


export interface IIngredientRepository{
    create(ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    get(id: string): IIngredient | Promise<IIngredient>;
    getAll(): IIngredient[] | Promise<IIngredient[]>;
    update(id: string,ingredient: IIngredient): IIngredient | Promise<IIngredient>;
    delete(id: string): void;
}

export class IngredientRepository implements IIngredientRepository{
    /**
     *
     */
    constructor() {}
    async create(ingredient: IIngredient): Promise<IIngredient> {
        try{
            const ing = await Ingredient.create(ingredient)
            return ing;
        }catch(err: any){
            throw err;
        }
    }
    async get(id: string): Promise<IIngredient> {
        try{
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const ing = await Ingredient.findById(id);
            if(ing == null){
                throw new NotFoundError("Ingredient is not found");
            }
            return ing;
        }catch(err){
            throw err;
        }
    }
    async  getAll(): Promise<IIngredient[]> {
        try{
            const ings = await Ingredient.find();
            return ings;
        }catch(err){
            throw err;
        }
    }
    async update(id: string, ingredient: IIngredient): Promise<IIngredient> {
        try {
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const ing = await Ingredient.findByIdAndUpdate(id,ingredient);
            if(ing == null){
                throw new NotFoundError("Ingredient is not found");
            }
            return ing;
        } catch (err) {
            throw err;
        }
    }
    async delete(id: string) {
        try {
            if (!isValidObjectId(id)) {
                throw new InvalidObjectIdError();
            }
            const ing = await Ingredient.findByIdAndDelete(id);
            if(ing == null){
                throw new NotFoundError("Ingredient is not found");
            }
        } catch (error) {
            throw error;
        }
    }
}