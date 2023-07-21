import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "../../user/model/user.schema";
import { IStatut } from "../../statut/model/statut.schema";


export interface IReclamation {
  user: IUser;
  statut: IStatut;
  numero: string;
  type: string;
  description: string;
  date_creation: Date;
}

const reclamationSchema = new Schema<IReclamation>({
  statut: { type: Schema.Types.ObjectId, ref: 'Statut' }, 
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
  numero: String,
  type: String,
  description: String,
  date_creation: Date,
});

export const Reclamation = model<IReclamation>("Reclamation", reclamationSchema);
