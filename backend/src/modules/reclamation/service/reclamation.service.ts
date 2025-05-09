import { NotFoundError } from "../../../errors/NotFoundError";
import { IStatut, Statut } from "../../statut/model/statut.schema";
import { IReclamation } from "../model/reclamation.schema";
import { IReclamationRepository } from "../repository/reclamation.repository";




export interface IReclamationService {
  createReclamation(reclamation: IReclamation): IReclamation | Promise<IReclamation>;
  getReclamation(id: string): Promise<IReclamation | null>;
  allReclamations(): Promise<IReclamation[]>;
  deleteReclamation(id: string): void;
  updateReclamation(id: string, reclamation: IReclamation): void;
  groupByStatus():Promise<{ [status: string]: IReclamation[] }>;
  updateReclamationStatus(idReclamation: string, idStatus: string): Promise<void>
}

export class ReclamationService implements IReclamationService {
  constructor(private reclamationRepository: IReclamationRepository) {}

  async createReclamation(reclamation: IReclamation): Promise<IReclamation> {
    try {
    
     // const { statut } = reclamation;

      // Check if the type exists in the Statut collection
     // const existingType = await Statut.findById(statut);
    //  if (!existingType) {
     //   throw new NotFoundError("Invalid type provided.");
     // }

      return await this.reclamationRepository.create(reclamation);
    } catch (error) {
      throw error;
    }
  }

  async getReclamation(id: string): Promise<IReclamation | null> {
    try {

  

      const reclamation = await this.reclamationRepository.get(id);
      const statut = await Statut.findById(reclamation?.statut);

      if (statut== null)
      throw new NotFoundError("Statut Not  Found !");
      return reclamation;
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

  async updateReclamationStatus(idReclamation: string, idStatus: string): Promise<void> {
    try {
      await this.reclamationRepository.updateReclamationStatus(idReclamation,idStatus);
    } catch (error: any) {
      throw error;
    }
  }


  
  async groupByStatus(): Promise<{ [status: string]: IReclamation[] }>
  {
    try {
    
    //  console.log(status)
      const types = await this.reclamationRepository.groupByStatus();

    
    
      return types;
    } catch (error) {
      throw error;
    }
  }

   
  
  
   
 
  
  
  
  
  
}

