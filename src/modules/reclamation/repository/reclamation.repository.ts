import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IReclamation, Reclamation } from "../model/reclamation.schema";

export interface IReclamationRepository {
  create(reclamation: IReclamation): IReclamation | Promise<IReclamation>;
  get(id: string): IReclamation;
  all(): IReclamation[];
  delete(id: string): void;
  update(id: string, reclamation: IReclamation): void;
}

export class ReclamationRepository implements IReclamationRepository {
  constructor() {}
  async create(reclamation: IReclamation): Promise<IReclamation> {
    try {
      const doc = await Reclamation.create(reclamation);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }
  get(id: string): IReclamation {
    throw new Error("not implemented yet");
  }
  all(): IReclamation[] {
    throw new Error("not implemented yet");
  }
  delete(id: string): void {
    throw new Error("not implemented yet");
  }
  update(id: string, reclamation: IReclamation): void {
    throw new Error("not implemented yet");
  }
}
