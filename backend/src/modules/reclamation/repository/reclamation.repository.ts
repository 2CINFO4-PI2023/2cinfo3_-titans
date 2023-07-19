import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IReclamation, Reclamation } from "../model/reclamation.schema";

export interface IReclamationRepository {
  create(reclamation: IReclamation): Promise<IReclamation>;
  get(id: string): Promise<IReclamation | null>;
  all(): Promise<IReclamation[]>;
  delete(id: string): Promise<void>;
  update(id: string, reclamation: IReclamation): Promise<void>;
  fetchByStatut(statut: string): Promise<IReclamation[]>;
  groupByStatus(): Promise<{ [status: string]: IReclamation[] }>
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

  async fetchByStatut(statut: string): Promise<IReclamation[]> {
    try {
      const reclamations = await Reclamation.find({ statut: statut });
      
      return reclamations;
    } catch (error: any) {
      throw error;
    }
  }
  async groupByStatus(): Promise<{ [status: string]: IReclamation[] }> {
    try {
      // Use MongoDB's aggregation pipeline to group reclamations by status
      const groupedReclamations = await Reclamation.aggregate([
        {
          $group: {
            _id: "$statut", // Group by the "statut" field directly
            reclamations: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id", // Rename the "_id" field to "status"
            reclamations: 1,
          },
        },
      ]);
  
      console.log();
  
      // Convert the array of groupedReclamations to an object with status as keys
      const result: { [status: string]: IReclamation[] } = {};
      groupedReclamations.forEach((group) => {
        result[group.status] = group.reclamations;
      });
  
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
}
