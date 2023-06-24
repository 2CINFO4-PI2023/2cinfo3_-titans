import { Schema, model } from "mongoose";
import { IStatut } from "../../statut/model/statut.schema";
import { IUser } from "../../user/model/user.schema";


export interface IReclamation {
  
  user : IUser
  statut: IStatut;
  numero:String;
  description: string;
  date_creation:Date
}

const reclamationSchema = new Schema<IReclamation>({
 
 
  statut: { type: Schema.Types.ObjectId, ref: 'Statut' }, 
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
  numero:String,
  description:String,
  date_creation:Date
});

export const Reclamation = model<IReclamation>("Reclamation", reclamationSchema);
