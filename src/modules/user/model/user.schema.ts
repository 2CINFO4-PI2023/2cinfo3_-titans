import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address?: string;
  password?: string;
  isActive:boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true},
  phone: String,
  address: String,
  password: { type: String },
  isActive: { type: Boolean, default: false },
});

export const User = model<IUser>("User", userSchema);
