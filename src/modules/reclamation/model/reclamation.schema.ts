import { Schema, model } from "mongoose";
import { ITypereclamation } from "../../typereclamation/model/typereclamation.schema";

export interface IReclamation {
  name: string;
  email: string;
  phone: string;
  type: ITypereclamation;
  message: string;
}

const reclamationSchema = new Schema<IReclamation>({
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone: String,
  type: { type: Schema.Types.ObjectId, ref: 'Typereclamation' }, 
  message:String
});

export const Reclamation = model<IReclamation>("Reclamation", reclamationSchema);
