import { DuplicatedError } from "../../../errors/DuplicatedError";
import { ITypereclamation, Typereclamation } from "../model/typereclamation.schema";

export interface ITypereclamationRepository {
  create(typereclamation: ITypereclamation): Promise<ITypereclamation>;
  get(id: string): Promise<ITypereclamation | null>;
  all(): Promise<ITypereclamation[]>;
  delete(id: string): Promise<void>;
  update(id: string, typereclamation: ITypereclamation): Promise<void>;
}

export class TypereclamationRepository implements ITypereclamationRepository {
  constructor() {}

  async create(typereclamation: ITypereclamation): Promise<ITypereclamation> {
    try {
      const doc = await Typereclamation.create(typereclamation);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("Typereclamation already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<ITypereclamation | null> {
    try {
      const doc = await Typereclamation.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<ITypereclamation[]> {
    try {
      const docs = await Typereclamation.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Typereclamation.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, typereclamation: ITypereclamation): Promise<void> {
    try {
      await Typereclamation.findByIdAndUpdate(id, typereclamation);
    } catch (error: any) {
      throw error;
    }
  }
}