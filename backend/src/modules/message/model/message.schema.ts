import { Schema, model } from "mongoose";
import { IUser } from "../../user/model/user.schema";

export interface IMessage {
  user : IUser;
  description: string;
  from:string;
  date_creation:Date
}

const messageSchema = new Schema<IMessage>({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
  description:String,
  from:String,
  date_creation:Date
});

export const Message = model<IMessage>("Message", messageSchema);
