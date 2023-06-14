import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IReclamation, Reclamation } from "../model/reclamation.schema";

export interface IReclamationRepository {
  create(reclamation: IReclamation): Promise<IReclamation>;
  get(id: string): Promise<IReclamation | null>;
  all(): Promise<IReclamation[]>;
  delete(id: string): Promise<void>;
  update(id: string, reclamation: IReclamation): Promise<void>;
}

export class ReclamationRepository implements IReclamationRepository {
  constructor() {}

  async create(reclamation: IReclamation): Promise<IReclamation> {
    try {
      const doc = await Reclamation.create(reclamation);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("Reclamation already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<IReclamation | null> {
    try {
      const doc = await Reclamation.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<IReclamation[]> {
    try {
      const docs = await Reclamation.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Reclamation.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, reclamation: IReclamation): Promise<void> {
    try {
      await Reclamation.findByIdAndUpdate(id, reclamation);
    } catch (error: any) {
      throw error;
    }
  }
}