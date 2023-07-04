import { Schema, Types, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  confirmed:boolean;
  role:number;
  _id?: Types.ObjectId
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true},
  phone: String,
  address: String,
  password: { type: String },
  confirmed: { type: Boolean, default: false },
  role: Number
},{
  timestamps:true
});

export const User = model<IUser>("User", userSchema);
