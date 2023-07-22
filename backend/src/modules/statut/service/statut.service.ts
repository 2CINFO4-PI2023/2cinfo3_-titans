import { IStatut } from "../model/statut.schema";
import { IStatutRepository } from "../repository/statut.repository";
import { IReclamation, Reclamation } from "../../reclamation/model/reclamation.schema";

export interface IStatutService {
  createStatut(statut: IStatut): IStatut | Promise<IStatut>;
  getStatut(id: string): Promise<IStatut | null>;
  allStatuts(): Promise<IStatut[]>;
  deleteStatut(id: string): void;
  updateStatut(id: string, statut: IStatut): void;
  findOrCreateNewStatus(id:string): Promise<IStatut>;
}

export class StatutService implements IStatutService {
  constructor(private statutRepository: IStatutRepository) {}

  async createStatut(statut: IStatut): Promise<IStatut> {
    try {
      return await this.statutRepository.create(statut);
    } catch (error) {
      throw error;
    }
  }

  async getStatut(id: string): Promise<IStatut | null> {
    try {
      return await this.statutRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async allStatuts(): Promise<IStatut[]> {
    try {
      return await this.statutRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteStatut(id: string): Promise<void> {
    try {

      const reclamations =await Reclamation.find();
      console.log(reclamations)
      await this.statutRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateStatut(id: string, statut: IStatut): Promise<void> {
    try {
      await this.statutRepository.update(id, statut);
    } catch (error: any) {
      throw error;
    }
  }

  
  async findOrCreateNewStatus(id:string): Promise<IStatut> {
    try {
      return await this.statutRepository.findOrCreateNewStatus(id);
    } catch (error: any) {
      throw error;
    }
  }
}

