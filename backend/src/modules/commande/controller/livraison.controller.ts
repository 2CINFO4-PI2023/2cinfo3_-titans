import { Request, Response } from "express";
import { ILivraisonService } from "../service/livraison.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";
import { ILivraison } from "../model/livraison.schema";

import mongoose, { Schema, model } from "mongoose";
import { HTTPError } from "../../../errors/HTTPError";

export interface ILivraisonController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export class LivraisonController implements ILivraisonController {
  constructor(private livraisonService: ILivraisonService) {}

  async create(req: Request, res: Response) {
    
    try {
      const livraison: ILivraison = {
        commande: mongoose.isValidObjectId("64ac6be5f2cefda913509b57") ? "64ac6be5f2cefda913509b57": null ,
        deliveryMan: {
          name: "mouhibbbb",
          phoneNumber: "548485448"
        },
        deliveryStatus: "en cours",
      };
      console.log("ssssss", livraison);
      const data = await this.livraisonService.createLivraison(livraison);
      res.status(200).json(data);

      // add confirmation email with mohamed
    } catch (error: any) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const livraison = await this.livraisonService.getLivraison(id);
      if (!livraison) {
        return res.status(404).json({ message: "livraison not found" });
      }
      res.json(livraison);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const livraisons = await this.livraisonService.allLivraisons();
      res.json(livraisons);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id =  mongoose.isValidObjectId(req.params.id) ? req.params.id : "";
      
        const livraison = req.body;
      console.log("upfff",livraison,id)
      const response = await this.livraisonService.updateLivraison(
        id,
        livraison
      );
      res.json({ message: "livraison updated successfully", response });
      
    } catch (error: any) {
      if (error instanceof HTTPError) {
        return res
          .status(error.http_code)
          .json({ message: error.message, description: error.description });
      }
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.livraisonService.deleteLivraison(id);
      res.json({ message: "livraison deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
