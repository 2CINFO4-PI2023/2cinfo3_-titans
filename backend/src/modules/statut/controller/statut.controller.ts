import { Request, Response } from "express";
import { IStatutService } from "../service/statut.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface IStatutController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  findOrCreateNewStatus(req: Request, res: Response): void;

}

export class StatutController implements IStatutController {
  constructor(private statutService: IStatutService) {}

  async create(req: Request, res: Response) {
    try {
      const statut = req.body;
      const data = await this.statutService.createStatut(statut);
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
      const statut = await this.statutService.getStatut(id);
      if (!statut) {
        return res.status(404).json({ message: "Statut not found" });
      }
      res.json(statut);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const statuts = await this.statutService.allStatuts();
      res.json(statuts);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const statut = req.body;
      await this.statutService.updateStatut(id, statut);
      res.json({ message: "Statut updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.statutService.deleteStatut(id);
      res.json({ message: "Statut deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
  
  async findOrCreateNewStatus(req: Request, res: Response) {
    try {
     const statut =req.params.statut
      const newStatus = await this.statutService.findOrCreateNewStatus(statut);
      res.json(newStatus);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
