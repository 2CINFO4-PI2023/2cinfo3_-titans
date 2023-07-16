import { Schema, Types, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;
  confirmed:boolean;
  role:number | string;
  image?:string,
  _id?: Types.ObjectId
  favoritePlat: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true},
  phone:  { type: String,sparse: true,unique: true},
  address: String,
  image:String,
  password: { type: String },
  confirmed: { type: Boolean, default: false },
  favoritePlat:[{ type: Schema.Types.ObjectId, ref: 'Plat' }],
  role: Number
},{
  timestamps:true
});

export const User = model<IUser>("User", userSchema);
