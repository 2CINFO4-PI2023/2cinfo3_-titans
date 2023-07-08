import { Schema, Document, model, SchemaTimestampsConfig } from "mongoose";
import { Event } from "./event.schema";
import { User } from "../../user/model/user.schema";


export interface IInscription extends Document, SchemaTimestampsConfig {
  eventId: Schema.Types.ObjectId | string;
  userId: Schema.Types.ObjectId | string;
  name: string;
  email: string;
  status: string;
}

const inscriptionSchema = new Schema<IInscription>({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String,    required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
});

inscriptionSchema.post<IInscription>("save", async function (doc) {
  const event = await Event.findById(doc.eventId);
  if (event) {
    event.availablePlaces -= 1;
    await event.save();
  }
});

export const Inscription = model<IInscription>("Inscription", inscriptionSchema);
