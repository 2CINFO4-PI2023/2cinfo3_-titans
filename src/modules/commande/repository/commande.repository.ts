import { DuplicatedError } from "../../../errors/DuplicatedError";
import { ICommande, Commande } from "../model/commande.schema";

export interface ICommandeRepository {
  create(commande: ICommande): Promise<ICommande>;
  get(id: string): Promise<ICommande | null>;
  all(): Promise<ICommande[]>;
  delete(id: string): Promise<void>;
  update(id: string, commande: ICommande): Promise<void>;
}

export class CommandeRepository implements ICommandeRepository {
  constructor() {}

  async create(commande: ICommande): Promise<ICommande> {
    try {
      const doc = await Commande.create(commande);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("commande already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<ICommande | null> {
    try {
      const doc = await Commande.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<ICommande[]> {
    try {
      const docs = await Commande.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Commande.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, commande: ICommande): Promise<void> {
    try {
      await Commande.findByIdAndUpdate(id, commande);
    } catch (error: any) {
      throw error;
    }
  }
}