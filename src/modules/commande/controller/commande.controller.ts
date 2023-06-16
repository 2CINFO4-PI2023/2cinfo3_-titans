import { Request, Response } from "express";
import { ICommandeService } from "../service/commande.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface ICommandeController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export class CommandeController implements ICommandeController {
  constructor(private commandeService: ICommandeService) {}

  async create(req: Request, res: Response) {
    try {
      const commande = req.body;
      const data = await this.commandeService.createCommande(commande);
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
      const commande = await this.commandeService.getCommande(id);
      if (!commande) {
        return res.status(404).json({ message: "Commande not found" });
      }
      res.json(commande);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const commandes = await this.commandeService.allCommandes();
      res.json(commandes);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const commande = req.body;
      await this.commandeService.updateCommande(id, commande);
      res.json({ message: "Commande updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.commandeService.deleteCommande(id);
      res.json({ message: "Commande deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
