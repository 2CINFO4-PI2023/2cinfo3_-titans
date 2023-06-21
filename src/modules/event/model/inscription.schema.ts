import { Schema, Document, model, SchemaTimestampsConfig } from "mongoose";

export interface IInscription extends Document, SchemaTimestampsConfig {
  eventId: Schema.Types.ObjectId | string;
  name: string;
  email: string;
  status: string;
}

const inscriptionSchema = new Schema<IInscription>({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
});

export const Inscription = model<IInscription>("Inscription", inscriptionSchema);
