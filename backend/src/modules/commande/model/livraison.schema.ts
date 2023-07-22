import { Schema, model } from "mongoose";

export interface ILivraison {
  commande?: any;
  deliveryStatus?: String;
  deliveryMan?: any;
}

const livraisonSchema = new Schema<ILivraison>(
  {
    commande: { type: Schema.Types.ObjectId, required: true, ref: "Commande" },
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
    deliveryStatus: { type: String, required: false, default: "Processing" },
  },
  {
    timestamps: true,
  }
);

export const Livraison = model<ILivraison>("Livraison", livraisonSchema);
