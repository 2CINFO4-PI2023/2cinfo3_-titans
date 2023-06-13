import { IUser } from "../model/user.schema";

interface IUserRepository {
  create(user: IUser): void;
  get(id: string): IUser;
  all(): IUser[];
  delete(id: string): void;
  update(id: string, user: IUser): void;
}

export class UserRepository implements IUserRepository {
  create(user: IUser): void {
    throw new Error("not implemented yet");
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
