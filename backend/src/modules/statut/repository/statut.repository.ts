import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IStatut, Statut } from "../model/statut.schema";

export interface IStatutRepository {
  create(statut: IStatut): Promise<IStatut>;
  get(id: string): Promise<IStatut | null>;
  all(): Promise<IStatut[]>;
  delete(id: string): Promise<void>;
  update(id: string, statut: IStatut): Promise<void>;
  findOrCreateNewStatus(id:string): Promise<IStatut>;
}

export class StatutRepository implements IStatutRepository {
  constructor() {}

  async create(statut: IStatut): Promise<IStatut> {
    try {
      const doc = await Statut.create(statut);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("Statut already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<IStatut | null> {
    try {
      const doc = await Statut.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<IStatut[]> {
    try {
      const docs = await Statut.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Statut.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, statut: IStatut): Promise<void> {
    try {
      await Statut.findByIdAndUpdate(id, statut);
    } catch (error: any) {
      throw error;
    }
  }

  async findOrCreateNewStatus(id:string): Promise<IStatut> {
    try {
      const existingStatus = await Statut.findOne({ statut: id });
      if (existingStatus) {
        return existingStatus;
      } else {
        const newStatus: IStatut = { statut: id };
        const createdStatus = await this.create(newStatus);
        return createdStatus;
      }
    } catch (error: any) {
      throw error;
    }
  }
}