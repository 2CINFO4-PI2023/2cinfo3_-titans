import { readFileSync } from "fs";
import { IMailNotifier } from "../../../notifiers/mail/mail.service";
import { IInscription } from "../model/inscription.schema";
import { IInscriptionRepository } from "../repository/inscription.repository";
import { IUser } from "../../user/model/user.schema";

export interface IInscriptionService {
  createInscription(inscription: IInscription): Promise<IInscription>;
  getInscription(id: string): Promise<IInscription | null>;
  getAllInscriptions(): Promise<IInscription[]>;
  deleteInscription(id: string): Promise<void>;
  getUserById(id: string): Promise<IUser | null>; // Add the getUserById method
}

export class InscriptionService implements IInscriptionService {
  constructor(
    private inscriptionRepository: IInscriptionRepository,
    private mailNotifier: IMailNotifier
  ) {}

  async createInscription(inscription: IInscription): Promise<IInscription> {
    try {
      const eventId = inscription.eventId.toString(); // Convert eventId to string
      const userId = inscription.userId.toString(); // Convert userId to string
      const event = await this.inscriptionRepository.getEventById(eventId);
      const user = await this.inscriptionRepository.getUserById(userId);
      
      if (!event) {
        throw new Error("Event not found.");
      }

      if (event.availablePlaces <= 0) {
        const apologyContent = readFileSync("dist/apology.html", "utf8").toString();
        this.mailNotifier.sendMail(inscription.email, apologyContent, "Apology for Event Full");

        throw new Error("Event is already full. Apology email sent.");
      }

      const doc = await this.inscriptionRepository.create(inscription);
      const confirmationContent = readFileSync("dist/event_confirmation.html", "utf8").toString();
      // Modify the email content as needed
      this.mailNotifier.sendMail(doc.email, confirmationContent, "Inscription Confirmation");
      return doc;
    } catch (error) {
      throw error;
    }
  }

  async getInscription(id: string): Promise<IInscription | null> {
    try {
      return await this.inscriptionRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async getAllInscriptions(): Promise<IInscription[]> {
    try {
      return await this.inscriptionRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  async deleteInscription(id: string): Promise<void> {
    try {
      await this.inscriptionRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      return await this.inscriptionRepository.getUserById(id);
    } catch (error) {
      throw error;
    }
  }
}
