import { Schema, model, SchemaTimestampsConfig, Types } from "mongoose";

export interface IEvent extends SchemaTimestampsConfig {
  name: string;
  date: Date;
  description: string;
  address?: string;
  inscriptions: Types.ObjectId[]; // Array of ObjectId references to inscriptions
  event_capacity: number; // Total capacity of the event
  availablePlaces: number; // Available places for the event
}

const eventSchema = new Schema<IEvent>({
  name: { type: String },
  date: { type: Date },
  description: String,
  address: String,
  inscriptions: [{ type: Schema.Types.ObjectId, ref: "Inscription" }], // Reference to Inscription model
  event_capacity: { type: Number, required: true },
  availablePlaces: { type: Number, required: true }
});

export const Event = model<IEvent>("Event", eventSchema);
