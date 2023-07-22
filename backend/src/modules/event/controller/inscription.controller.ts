import { Request, Response } from "express";
import { IInscriptionService, IInscription } from "../service/inscription.service";
import { IUser } from "../../user/model/user.schema";

export interface IInscriptionController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  getUser(req: Request, res: Response): void;
  updateInscription(req: Request, res: Response): void;
}

export class InscriptionController implements IInscriptionController {
  constructor(private inscriptionService: IInscriptionService) {}

  async create(req: Request, res: Response) {
    try {
      const inscription = req.body as IInscription;
      const data = await this.inscriptionService.createInscription(inscription);
      res.status(201).json(data);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const inscription = await this.inscriptionService.getInscription(id);
      if (!inscription) {
        return res.status(404).json({ message: "Inscription not found" });
      }
      res.json(inscription);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const inscriptions = await this.inscriptionService.getAllInscriptions();
      res.json(inscriptions);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.inscriptionService.deleteInscription(id);
      res.json({ message: "Inscription deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async updateInscription(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const inscriptionUpdate: Partial<IInscription> = req.body;
      await this.inscriptionService.updateInscription(id, inscriptionUpdate);
      res.json({ message: "Inscription updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.inscriptionService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
