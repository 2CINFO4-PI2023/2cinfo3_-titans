import { isValidObjectId } from "mongoose";
import { DuplicatedError } from "../../../errors/DuplicatedError";
import { InvalidObjectIdError } from "../../../errors/InvalidObjectIdError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { IUser, User } from "../model/user.schema";

export interface IUserRepository {
  create(user: IUser): IUser | Promise<IUser>;
  get(id: string): IUser | Promise<IUser>;
  all(): IUser[] | Promise<IUser[]>;
  delete(id: string): void;
  update(id: string, user: IUser): void;
  findByEmail(email: string): IUser | Promise<IUser>;
}

export class UserRepository implements IUserRepository {
  constructor() {}
  async create(user: IUser): Promise<IUser> {
    try {
      const doc = await User.create(user);
      const { password, ...userWithoutPassword } = doc.toObject();
      return userWithoutPassword;
    } catch (error: any) {
      if (error.code == 11000) {
        throw new DuplicatedError("Email is already used");
      }
      throw error;
    }
  }
  async get(id: string): Promise<IUser> {
    try {
      if (!isValidObjectId(id)) {
        throw new InvalidObjectIdError();
      }
      const user = await User.findById(id).select('-password');
      if (user == null) {
        throw new NotFoundError("user not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async all(): Promise<IUser[]> {
    try {
      const users = await User.find().select('-password');
      return users;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new InvalidObjectIdError();
      }
      const doc = await User.findByIdAndDelete(id);
      if (doc == null) {
        throw new NotFoundError("user not found");
      }
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, user: IUser) {
    try {
      if (!isValidObjectId(id)) {
        throw new InvalidObjectIdError();
      }
      const doc = await User.findByIdAndUpdate(id, user, { new: true });
      if (doc == null) {
        throw new NotFoundError("user not found");
      }
      const { password, ...userWithoutPassword } = doc.toObject();
      return userWithoutPassword;
    } catch (error: any) {
      if (error.code == 11000) {
        throw new DuplicatedError("Email is already used");
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    try {
      const doc = await User.findOne({ email });
      if (doc == null) {
        throw new NotFoundError("user not found");
      }
      return doc;
    } catch (error) {
      throw error;
    }
  }
}
