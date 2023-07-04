import { hash } from "bcrypt";
import { IUser } from "../model/user.schema";
import { IUserRepository } from "../repository/user.repository";
import { deleteFile } from "../../../helpers/fs";

export interface IUserService {
  createUser(user: IUser): IUser | Promise<IUser>;
  getUser(id: string): IUser | Promise<IUser>;
  allUsers(): IUser[] | Promise<IUser[]>;
  deleteUser(id: string): void;
  updateUser(id: string, user: IUser): void;
  findByEmail(email: string): IUser | Promise<IUser>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(user: IUser): Promise<IUser> {
    try {
      if (user.password) {
        const hashedPassword = await hash(<string>user.password, 10);
        user.password = hashedPassword;
      }
      return await this.userRepository.create(user);
    } catch (error) {
      throw error;
    }
  }
  async getUser(id: string): Promise<IUser> {
    try {
      const user = await this.userRepository.get(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async allUsers(): Promise<IUser[]> {
    try {
      const users = await this.userRepository.all();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.delete(id);
      deleteFile(<string>user.image)
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, user: IUser) {
    try {
      const doc = await this.userRepository.get(id)
      if(doc.image != user.image){
        deleteFile(<string>doc.image)
      }
      if (user.password) {
        const hashedPassword = await hash(<string>user.password, 10);
        user.password = hashedPassword;
      }
      return await this.userRepository.update(id, user);
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }
}
