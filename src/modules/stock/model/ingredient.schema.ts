import { Schema, model } from "mongoose";

export interface IIngredient {
    name: string;
    quantity: number;
}

const ingredientSchema = new Schema<IIngredient>({
    name: { type: String ,required:true},
    quantity: { type: Number ,required:true}
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);