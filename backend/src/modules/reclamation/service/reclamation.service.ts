import { IReclamation } from "../model/reclamation.schema";
import { IReclamationRepository } from "../repository/reclamation.repository";

export interface IReclamationService {
  createReclamation(reclamation: IReclamation): IReclamation | Promise<IReclamation>;
  getReclamation(id: string): Promise<IReclamation | null>;
  allReclamations(): Promise<IReclamation[]>;
  deleteReclamation(id: string): void;
  updateReclamation(id: string, reclamation: IReclamation): void;
}

export class ReclamationService implements IReclamationService {
  constructor(private reclamationRepository: IReclamationRepository) {}

  async createReclamation(reclamation: IReclamation): Promise<IReclamation> {
    try {
      return await this.reclamationRepository.create(reclamation);
    } catch (error) {
      throw error;
    }
  }

  async getReclamation(id: string): Promise<IReclamation | null> {
    try {
      return await this.reclamationRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async allReclamations(): Promise<IReclamation[]> {
    try {
      return await this.reclamationRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteReclamation(id: string): Promise<void> {
    try {
      await this.reclamationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateReclamation(id: string, reclamation: IReclamation): Promise<void> {
    try {
      await this.reclamationRepository.update(id, reclamation);
    } catch (error: any) {
      throw error;
    }
  }
}

