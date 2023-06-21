import { IInscription } from "../model/inscription.schema";
import { IInscriptionRepository } from "../repository/inscription.repository";

export interface IInscriptionService {
  createInscription(inscription: IInscription): Promise<IInscription>;
  getInscription(id: string): Promise<IInscription | null>;
  getAllInscriptions(): Promise<IInscription[]>;
  deleteInscription(id: string): Promise<void>;
}

export class InscriptionService implements IInscriptionService {
  constructor(private inscriptionRepository: IInscriptionRepository) {}

  async createInscription(inscription: IInscription): Promise<IInscription> {
    try {
      return await this.inscriptionRepository.create(inscription);
    } catch (error) {
      throw error;
    }
  }

  async getInscription(id: string): Promise<IInscription | null> {
    try {
      return await this.inscriptionRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllInscriptions(): Promise<IInscription[]> {
    try {
      return await this.inscriptionRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  async deleteInscription(id: string): Promise<void> {
    try {
      await this.inscriptionRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
