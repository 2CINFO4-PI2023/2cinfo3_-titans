import { Request, Response } from "express";
import { ITypereclamationService } from "../service/typereclamation.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface ITypereclamationController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export class TypereclamationController implements ITypereclamationController {
  constructor(private typereclamationService: ITypereclamationService) {}

  async create(req: Request, res: Response) {
    try {
      const typereclamation = req.body;
      const data = await this.typereclamationService.createTypereclamation(typereclamation);
      res.status(201).json(data);
    } catch (error: any) {
      if (error instanceof DuplicatedError) {
        return res.status(error.http_code).json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const typereclamation = await this.typereclamationService.getTypereclamation(id);
      if (!typereclamation) {
        return res.status(404).json({ message: "Typereclamation not found" });
      }
      res.json(typereclamation);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const typereclamations = await this.typereclamationService.allTypereclamations();
      res.json(typereclamations);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const typereclamation = req.body;
      await this.typereclamationService.updateTypereclamation(id, typereclamation);
      res.json({ message: "Typereclamation updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.typereclamationService.deleteTypereclamation(id);
      res.json({ message: "Typereclamation deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
