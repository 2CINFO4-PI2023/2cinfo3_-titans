import { Schema, model, SchemaTimestampsConfig, Types, Document } from "mongoose";
import { Inscription } from "./inscription.schema";

export interface IEvent extends Document, SchemaTimestampsConfig {
  name: string;
  date: Date;
  description: string;
  address?: string;
  inscriptions: Types.ObjectId[]; // Array of ObjectId references to inscriptions
  event_capacity: number; // Total capacity of the event
  availablePlaces: number; // Available places for the event
  eventType: Types.ObjectId; // Add this field
  image: string;
}

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String },
    date: { type: Date },
    description: String,
    address: String,
    inscriptions: [{ type: Schema.Types.ObjectId, ref: "Inscription" }], // Reference to Inscription model
    event_capacity: { type: Number, required: true },
    availablePlaces: { type: Number, required: true },
    eventType: { type: Schema.Types.ObjectId, ref: "EventType", required: true }, // Add this field
    image: { type: String }
  },
  { timestamps: true } // Add timestamps option for createdAt and updatedAt fields
);

// Pre-save hook to update the available places when an inscription is created
eventSchema.pre<IEvent>("save", async function () {
  const inscriptionCount = await Inscription.countDocuments({ eventId: this._id });
  this.availablePlaces = this.event_capacity - inscriptionCount;
});

export const Event = model<IEvent>("Event", eventSchema);
