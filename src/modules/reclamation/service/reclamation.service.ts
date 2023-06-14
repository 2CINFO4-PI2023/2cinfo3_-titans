import { IReclamation } from "../model/reclamation.schema";
import { IReclamationRepository } from "../repository/reclamation.repository";

export interface IReclamationService {
  createReclamation(reclamation: IReclamation): IReclamation | Promise<IReclamation>;
  getReclamation(id: string): IReclamation;
  allReclamations(): IReclamation[];
  deleteReclamation(id: string): void;
  updateReclamation(id: string, reclamation: IReclamation): void;
}

export class ReclamationService implements IReclamationService {

  constructor(private reclamationRepository: IReclamationRepository) {}
  
  async createReclamation(reclamation: IReclamation): Promise<IReclamation> {
    try {
      return await this.reclamationRepository.create(reclamation)
    } catch (error) {
      throw error
    }
  }
  getReclamation(id: string): IReclamation {
    throw new Error("not implemented yet");
  }
  allReclamations(): IReclamation[] {
    throw new Error("not implemented yet");
  }
  deleteReclamation(id: string): void {
    throw new Error("not implemented yet");
  }
  updateReclamation(id: string, reclamation: IReclamation): void {
    throw new Error("not implemented yet");
  }
}
