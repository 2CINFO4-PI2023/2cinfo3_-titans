import { Schema, model } from "mongoose";

export interface IReclamation {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

const reclamationSchema = new Schema<IReclamation>({
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone: String,
  type: String,
  message:String
});

export const Reclamation = model<IReclamation>("Reclamation", reclamationSchema);
