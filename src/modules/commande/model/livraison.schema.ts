import { Schema, model } from "mongoose";

export interface ILivraison {
  commande: any;
  deliveryStatus?: any;
  deliveryMan?: any;
}

const livraisonSchema = new Schema<ILivraison>({
  commande: { type: Schema.Types.ObjectId, required: false, ref: "Commande" },
  deliveryMan: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  deliveryStatus: { type: String, required: true, default: "Processing" },
});

export const Livraison = model<ILivraison>("Livraison", livraisonSchema);
