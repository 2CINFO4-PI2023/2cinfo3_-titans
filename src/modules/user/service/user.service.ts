import { hash } from "bcrypt";
import { IUser } from "../model/user.schema";
import { IUserRepository } from "../repository/user.repository";
import { deleteFile } from "../../../helpers/fs";
import { ROLES } from "./auth.service";
import { IPlat } from "../../stock/model/plat.schema";
import { IPlatRepository } from "../../stock/repository/plat.repository";
import { use } from "passport";

export interface IUserService {
  createUser(user: IUser): IUser | Promise<IUser>;
  getUser(id: string): IUser | Promise<IUser>;
  allUsers(): IUser[] | Promise<IUser[]>;
  deleteUser(id: string): void;
  updateUser(id: string, user: IUser): void;
  findByEmail(email: string): IUser | Promise<IUser>;
  createAdmin(user: IUser): IUser | Promise<IUser>;
  favoritePlat(id: string): IPlat[] | Promise<IPlat[]>;
  addPlatToFavorite(id: string, platId: string): void;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository, private platRepo: IPlatRepository) { }

  async createUser(user: IUser): Promise<IUser> {
    try {
      if (user.password) {
        const hashedPassword = await hash(<string>user.password, 10);
        user.password = hashedPassword;
      }
      user.role = ROLES.CLIENT;
      user.confirmed = true
      return await this.userRepository.create(user);
    } catch (error) {
      throw error;
    }
  }
  async createAdmin(user: IUser): Promise<IUser> {
    try {
      if (user.password) {
        const hashedPassword = await hash(<string>user.password, 10);
        user.password = hashedPassword;
      }
      user.role = ROLES.ADMIN;
      user.confirmed = true
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
  async favoritePlat(id: string): Promise<IPlat[]> {
    try {
      console.info("trying to get favorite plates");
      const user = await this.userRepository.get(id);
      let favPlats: IPlat[] = new Array;
      for (const platid of user.favoritePlat) {
        const plat = await this.platRepo.get(platid);
        console.log(plat);
        favPlats.push(plat);
      }
      console.log(favPlats);
      console.info("returned favorite plates");
      return favPlats;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async addPlatToFavorite(userId: string, platId: string) {
    
    try {
      console.info("trying to add to favorite plate");
      const user = await this.userRepository.get(userId);
      let duplicatedPlat:boolean = false;
      for (const platid of user.favoritePlat) {
        if(platid==platId){
          duplicatedPlat = true;
          break;
        }
      }
      if(!duplicatedPlat){
        user.favoritePlat.push(platId);
        console.info("favorite plate added into the list");
      }else{
        const index = user.favoritePlat.indexOf(platId);
        if (index !== -1) {
          user.favoritePlat.splice(index, 1);
          console.info("favorite plate deleted from the list");
        }
      }
      this.userRepository.update(userId, user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
