import { Request, Response } from "express";
import { IReclamationService } from "../service/reclamation.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";
import { User } from "../../user/model/user.schema";

export interface IReclamationController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export class ReclamationController implements IReclamationController {
  constructor(private reclamationService: IReclamationService) {}

  async create(req: Request, res: Response) {
    try {

     
      const id = req.params.id;
      const user =await User.findById(id);
     

      const reclamation = req.body;
      reclamation.user=user;
      
      const data = await this.reclamationService.createReclamation(reclamation);
      
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
      const reclamation = await this.reclamationService.getReclamation(id);
      if (!reclamation) {
        return res.status(404).json({ message: "Reclamation not found" });
      }
      res.json(reclamation);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const reclamations = await this.reclamationService.allReclamations();
      res.json(reclamations);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const reclamation = req.body;
      await this.reclamationService.updateReclamation(id, reclamation);
      res.json({ message: "Reclamation updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.reclamationService.deleteReclamation(id);
      res.json({ message: "Reclamation deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
