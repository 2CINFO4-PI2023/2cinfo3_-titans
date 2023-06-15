import { Schema, model } from "mongoose";
import { IIngredient, Ingredient } from "./ingredient.schema";

export interface IPlat {
    name: string;
    ingredients: IIngredient[]
    price: number;
}

const platSchema = new Schema<IPlat>({
    name: { type: String ,required:true},
    price: { type: Number ,required:true},
    ingredients: [{ type: Ingredient, required:true}]

});

export const Plat = model<IPlat>("Plat", platSchema);