import { Schema, model } from "mongoose";

export interface IStatut {
  statut: string;

}

const statutSchema = new Schema<IStatut>({
  statut: { type: String, required: true},
 
});

export const Statut = model<IStatut>("Statut", statutSchema);
