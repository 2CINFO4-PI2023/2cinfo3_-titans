import { Document, Schema, model } from "mongoose";
import { IIngredient, Ingredient } from "./ingredient.schema";

export interface IPlat extends Document {
    name: string;
    ingredients: Map<IIngredient['_id'], number>;
    price: number;
    image: string;
    shortDetails?: string;
    description?: string;
}

const platSchema = new Schema<IPlat>({
    name: { type: String, required: true },
    ingredients: {
        type: Map,
        of: Number,
        required: true,
    },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    shortDetails : { type: String, required: false },
    description : { type: String, required: false },

},
{
    timestamps: true
});

export const Plat = model<IPlat>("Plat", platSchema);