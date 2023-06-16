import { Schema, model } from "mongoose";

export interface ITypereclamation {
  type: string;
  stype: string;

}

const typereclamationSchema = new Schema<ITypereclamation>({
  type: { type: String, required: true},
  stype: { type: String},
});

export const Typereclamation = model<ITypereclamation>("Typetypereclamation", typereclamationSchema);
