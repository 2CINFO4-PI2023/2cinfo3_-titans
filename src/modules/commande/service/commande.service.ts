import { ICommande } from "../model/commande.schema";
import { ICommandeRepository } from "../repository/commande.repository";

export interface ICommandeService {
  createCommande(commande: ICommande): ICommande | Promise<ICommande>;
  getCommande(id: string): Promise<ICommande | null>;
  allCommandes(): Promise<ICommande[]>;
  deleteCommande(id: string): void;
  updateCommande(id: string, commande: ICommande): void;
}

export class CommandeService implements ICommandeService {
  constructor(private commandeRepository: ICommandeRepository) {}

  async createCommande(commande: ICommande): Promise<ICommande> {
    try {
      return await this.commandeRepository.create(commande);
    } catch (error) {
      throw error;
    }
  }

  async getCommande(id: string): Promise<ICommande | null> {
    try {
      return await this.commandeRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async allCommandes(): Promise<ICommande[]> {
    try {
      return await this.commandeRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteCommande(id: string): Promise<void> {
    try {
      await this.commandeRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateCommande(id: string, commande: ICommande): Promise<void> {
    try {
      await this.commandeRepository.update(id, commande);
    } catch (error: any) {
      throw error;
    }
  }
}

