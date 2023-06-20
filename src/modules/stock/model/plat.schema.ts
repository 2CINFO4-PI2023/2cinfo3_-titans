import { Document, Schema, model } from "mongoose";
import { IIngredient, Ingredient } from "./ingredient.schema";

export interface IPlat extends Document {
    name: string;
    ingredients: Array<{ ingredient: IIngredient['_id']; quantity: number }>;
    price: number;
    image: string;
}

const platSchema = new Schema<IPlat>({
    name: { type: String, required: true },
    ingredients: [{
        ingredient: { type: Schema.Types.ObjectId, ref: Ingredient },
        quantity: { type: Number, required: true }
    }],
    price: { type: Number, required: true },
    image: { type: String, required: true }

});

export const Plat = model<IPlat>("Plat", platSchema);