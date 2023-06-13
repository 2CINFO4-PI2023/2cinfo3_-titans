import { IUser, User } from "../model/user.schema";

export interface IUserRepository {
  create(user: IUser): IUser | Promise<IUser>;
  get(id: string): IUser;
  all(): IUser[];
  delete(id: string): void;
  update(id: string, user: IUser): void;
}

export class UserRepository implements IUserRepository {
  constructor(){}
  async create(user: IUser): Promise<IUser> {
    try {
      const doc = await User.create(user);
      return doc;
    } catch (error) {
      console.log("error: ", error);
      // check if is duplicated
      throw error;
    }
  }
  get(id: string): IUser {
    throw new Error("not implemented yet");
  }
  all(): IUser[] {
    throw new Error("not implemented yet");
  }
  delete(id: string): void {
    throw new Error("not implemented yet");
  }
  update(id: string, user: IUser): void {
    throw new Error("not implemented yet");
  }
}
