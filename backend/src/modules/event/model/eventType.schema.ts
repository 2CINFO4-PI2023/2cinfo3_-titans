import { Schema, model, Document } from "mongoose";

export interface IEventType extends Document {
  name: string;
  description: string;
  // Add other fields as needed
}

const eventTypeSchema = new Schema<IEventType>({
  name: { type: String, required: true },
  description: { type: String },
  // Define other fields and their types
});

export const EventType = model<IEventType>("EventType", eventTypeSchema);
