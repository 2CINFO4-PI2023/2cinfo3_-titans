import { Request, Response } from "express";
import { ICommandeService } from "../service/commande.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";
import { PlatRepository } from "../../stock/repository/plat.repository";

export interface ICommandeController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  payCommande(req: Request, res: Response): any;
}

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51NQZmtHmHdoE3GBpdVHeTCmGIgVQwTzbr9uUuxTtCwaFMCKNSqI1tvsu3sTrayjoI75Y1Gmxrwdqojd6pKlKUZn600qO0evALz"
);

export class CommandeController implements ICommandeController {
  constructor(private commandeService: ICommandeService) {}
  private platRepo: PlatRepository = new PlatRepository();

  async create(req: Request, res: Response) {
    try {
      let commande = req.body;
      let itemsPrice: any = 0;

      const { orderItems, taxPrice, shippingPrice } = req.body;
      for (let i = 0; i < orderItems.length; i++) {
        const plat = await this.platRepo.get(orderItems[i]?.plat);
        console.log("plat ==>", plat);
        itemsPrice = itemsPrice + plat?.price * orderItems[i]?.qty;
      }

      const totalPrice: any = itemsPrice + taxPrice + shippingPrice;

      commande = { ...commande, totalPrice, itemsPrice };
      const data = await this.commandeService.createCommande(commande);
      res.status(201).json(data);
    } catch (error: any) {
      if (error instanceof DuplicatedError) {
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
      const response = await this.commandeService.updateCommande(id, commande);
      res.json({ message: "Commande updated successfully", response });
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

  async payCommande(req: Request, res: Response) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "EUR",
              unit_amount: 2000,
              product_data: {
                name: "T-shirt",
                description: "Comfortable cotton t-shirt",
                images: ["https://example.com/t-shirt.png"],
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://someurl",
        cancel_url: "https://someurl",
      });

      res.status(200).json({
        success: true,
        info: session,
      });
    } catch (error: any) {
      res.status(500).send(error);
      throw error;
    }
  }
}
