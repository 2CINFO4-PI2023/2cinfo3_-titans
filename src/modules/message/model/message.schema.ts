import { Schema, model } from "mongoose";

export interface IMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const messageSchema = new Schema<IMessage>({
  name: { type: String, required: true},
  email: { type: String, required: true},
  phone: String,
  message:String
});

export const Message = model<IMessage>("Message", messageSchema);
