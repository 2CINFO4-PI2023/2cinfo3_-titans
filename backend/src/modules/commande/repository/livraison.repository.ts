import { DuplicatedError } from "../../../errors/DuplicatedError";
import { ILivraison, Livraison } from "../model/livraison.schema";

export interface ILivraisonRepository {
  create(livraison: ILivraison): Promise<ILivraison>;
  get(id: string): Promise<ILivraison | null>;
  all(): Promise<ILivraison[]>;
  delete(id: string): Promise<void>;
  update(id: string, livraison: ILivraison): Promise<ILivraison>;
}

export class LivraisonRepository implements ILivraisonRepository {
  constructor() {}

  async create(livraison: ILivraison): Promise<ILivraison> {
    try {
        console.log("gggggggg", livraison);

      const doc = await Livraison.create(livraison);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("Livraison already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<ILivraison | null> {
    try {
      const doc = await Livraison.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<ILivraison[]> {
    try {
      const docs = await Livraison.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Livraison.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, livraison: ILivraison): Promise<ILivraison> {
    try {
     const doc :any = await Livraison.findByIdAndUpdate(id, livraison);
     return doc;
    } catch (error: any) {
      throw error;
    }
  }
}