import { Schema, model } from "mongoose";

export interface IEvent {
  name: string;
  date: string;
  description: string;
  address?: string;
}

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: String, required: true},
  description: String,
  address: String
});

export const Event = model<IEvent>("Event", eventSchema);
