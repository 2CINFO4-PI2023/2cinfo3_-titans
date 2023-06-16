import { Schema, model } from "mongoose";

export interface ICommande {
  shippingInfo: any;
  user: any;
  orderItems: any;
  paymentInfo: any;
  paidAt: any;
  itemsPrice: any;
  taxPrice: any;
  shippingPrice: any;
  totalPrice: any;
  orderStatus: any;
  deliveredAt: any;
  createdAt: any;
}

const commandeSchema = new Schema<ICommande>({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      images: {
        type: Schema.Types.Mixed,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
      },

      plat: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Plat",
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },

  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Commande = model<ICommande>("Commande", commandeSchema);
