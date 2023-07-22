import { readFileSync } from "fs";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { ILivraison, Livraison } from "../model/livraison.schema";
import { ILivraisonRepository } from "../repository/livraison.repository";
import { UserService } from "../../user/service/user.service";
import { UserRepository } from "../../user/repository/user.repository";

export interface ILivraisonService {
  createLivraison(livraison: ILivraison): ILivraison | Promise<ILivraison>;
  getLivraison(id: string): Promise<ILivraison | null>;
  allLivraisons(): Promise<ILivraison[]>;
  deleteLivraison(id: string): void;
  updateLivraison(id: string, livraison: ILivraison): any;
}

export class LivraisonService implements ILivraisonService {
  constructor(private livraisonRepository: ILivraisonRepository, private mailNotifier: IMailNotifier) {}
  private userRepo: UserRepository = new UserRepository;

  async createLivraison(livraison: ILivraison): Promise<ILivraison> {
    try {
      const response =  await this.livraisonRepository.create(livraison);
      const user = await this.userRepo.get(response.commande?.user);
      const confirmationContent = readFileSync("dist/livraison_confirmation.html", "utf8").toString();
      // Modify the email content as needed
      this.mailNotifier.sendMail(user?.email, confirmationContent, "livraison Confirmation");
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLivraison(id: string): Promise<ILivraison | null> {
    try {
      return await this.livraisonRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async allLivraisons(): Promise<ILivraison[]> {
    try {
      return await this.livraisonRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteLivraison(id: string): Promise<void> {
    try {
      await this.livraisonRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateLivraison(id: string, livraison: ILivraison): Promise<any> {
    try {
      const response = await this.livraisonRepository.update(id, livraison);
      const confirmationContent = readFileSync("dist/livraison_termine.html", "utf8").toString();
      const user = await this.userRepo.get(response.commande?.user);

      // Modify the email content as needed
      if (response?.deliveryStatus === "delivered") {
      this.mailNotifier.sendMail(user?.email, confirmationContent, "livraison terminé");
      }
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}

