import { Document, Schema, model } from "mongoose";

export interface IIngredient extends Document {
    name: string;
    quantity: number;
    image: string
}

const ingredientSchema = new Schema<IIngredient>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
},
{
    timestamps: true
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);