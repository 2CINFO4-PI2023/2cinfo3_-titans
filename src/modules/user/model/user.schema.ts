import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true},
  phone: String,
  address: String,
  password:String
});

export const User = model<IUser>("User", userSchema);
