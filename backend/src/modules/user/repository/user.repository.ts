import { isValidObjectId } from "mongoose";
import { DuplicatedError } from "../../../errors/DuplicatedError";
import { InvalidObjectIdError } from "../../../errors/InvalidObjectIdError";
import { NotFoundError } from "../../../errors/NotFoundError";
import { IUser, User } from "../model/user.schema";

export interface IUserRepository {
  create(user: IUser): IUser | Promise<IUser>;
  get(id: string): IUser | Promise<IUser>;
  all(
    page: number,
    pageSize: number,
    filters: { [key: string]: string | number },
    sortField: string,
    sortOrder: string
  ): IUser[] | Promise<IUser[]>;
  delete(id: string): IUser | Promise<IUser>;
  update(id: string, user: IUser): void;
  findByEmail(email: string): IUser | Promise<IUser>;
  countUsers(filters: {
    [key: string]: string | number;
  }): Number | Promise<Number>;
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
      const user = await User.findById(id).select("-password");
      if (user == null) {
        throw new NotFoundError("user not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async all(
    page: number,
    pageSize: number,
    filters: { [key: string]: string },
    sortField: string,
    sortOrder: string
  ): Promise<IUser[]> {
    try {
      const skip = (page - 1) * pageSize;

      const query: any = {};

      if (filters.name) {
        query.name = { $regex: new RegExp(filters.name, "i") };
      }

      if (filters.email) {
        query.email = { $regex: new RegExp(filters.email, "i") };
      }

      if (filters.role) {
        query.role = parseInt(filters.role, 10);
      }

      if (filters.phone) {
        query.phone = { $regex: new RegExp(filters.phone, "i") };
      }

      const sortQuery: any = {};
      sortQuery[sortField] = sortOrder === "desc" ? -1 : 1;

      const users = await User.find(query)
        .select("-password")
        .skip(skip)
        .limit(pageSize)
        .sort(sortQuery);
      return users;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<IUser> {
    try {
      if (!isValidObjectId(id)) {
        throw new InvalidObjectIdError();
      }
      const doc = await User.findByIdAndDelete(id);
      if (doc == null) {
        throw new NotFoundError("user not found");
      }
      return doc;
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
  async countUsers(filters: { [key: string]: string }): Promise<Number> {
    try {
      const count = await User.countDocuments(filters);
      return count;
    } catch (error) {
      throw error;
    }
  }
}
