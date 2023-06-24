import { IInscription, Inscription } from "../model/inscription.schema";

export interface IInscriptionRepository {
  create(inscription: IInscription): Promise<IInscription>;
  get(id: string): Promise<IInscription | null>;
  getAll(): Promise<IInscription[]>;
  delete(id: string): Promise<void>;
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

  async delete(id: string): Promise<void> {
    try {
      await Inscription.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }
}
