import { ITypereclamation } from "../model/typereclamation.schema";
import { ITypereclamationRepository } from "../repository/typereclamation.repository";

export interface ITypereclamationService {
  createTypereclamation(typereclamation: ITypereclamation): ITypereclamation | Promise<ITypereclamation>;
  getTypereclamation(id: string): Promise<ITypereclamation | null>;
  allTypereclamations(): Promise<ITypereclamation[]>;
  deleteTypereclamation(id: string): void;
  updateTypereclamation(id: string, typereclamation: ITypereclamation): void;
}

export class TypereclamationService implements ITypereclamationService {
  constructor(private typereclamationRepository: ITypereclamationRepository) {}

  async createTypereclamation(typereclamation: ITypereclamation): Promise<ITypereclamation> {
    try {
      return await this.typereclamationRepository.create(typereclamation);
    } catch (error) {
      throw error;
    }
  }

  async getTypereclamation(id: string): Promise<ITypereclamation | null> {
    try {
      return await this.typereclamationRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async allTypereclamations(): Promise<ITypereclamation[]> {
    try {
      return await this.typereclamationRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteTypereclamation(id: string): Promise<void> {
    try {
      await this.typereclamationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateTypereclamation(id: string, typereclamation: ITypereclamation): Promise<void> {
    try {
      await this.typereclamationRepository.update(id, typereclamation);
    } catch (error: any) {
      throw error;
    }
  }
}

