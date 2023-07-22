import { IInscription, Inscription } from "../model/inscription.schema";
import { IEvent, Event } from "../model/event.schema";
import { IUser, User } from "../../user/model/user.schema";

export interface IInscriptionRepository {
  create(inscription: IInscription): Promise<IInscription>;
  get(id: string): Promise<IInscription | null>;
  getAll(): Promise<IInscription[]>;
  update(id: string, inscription: Partial<IInscription>): Promise<IInscription | null>; // Add the update method
  delete(id: string): Promise<void>;
  getEventById(id: string): Promise<IEvent | null>;
  getUserById(id: string): Promise<IUser | null>;
}


export class InscriptionRepository implements IInscriptionRepository {
  constructor() {}

  async create(inscription: IInscription): Promise<IInscription> {
    try {
      const doc = await Inscription.create(inscription);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async get(id: string): Promise<IInscription | null> {
    try {
      const doc = await Inscription.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<IInscription[]> {
    try {
      const docs = await Inscription.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, inscription: Partial<IInscription>): Promise<IInscription | null> {
    try {
      const updatedInscription = await Inscription.findByIdAndUpdate(id, inscription, { new: true });
      return updatedInscription;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Inscription.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async getEventById(id: string): Promise<IEvent | null> {
    try {
      const event = await Event.findById(id);
      return event;
    } catch (error: any) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw error;
    }
  }
}
