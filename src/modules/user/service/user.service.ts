import { IUser } from "../model/user.schema";
import { IUserRepository } from "../repository/user.repository";

interface IUserService {
  createUser(user: IUser): IUser | Promise<IUser>;
  getUser(id: string): IUser;
  allUsers(): IUser[];
  deleteUser(id: string): void;
  updateUser(id: string, user: IUser): void;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  createUser(user: IUser): IUser | Promise<IUser> {
    throw new Error("not implemented yet");
  }
  getUser(id: string): IUser {
    throw new Error("not implemented yet");
  }
  allUsers(): IUser[] {
    throw new Error("not implemented yet");
  }
  deleteUser(id: string): void {
    throw new Error("not implemented yet");
  }
  updateUser(id: string, user: IUser): void {
    throw new Error("not implemented yet");
  }
}
