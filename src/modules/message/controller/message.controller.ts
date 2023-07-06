import { Request, Response } from "express";
import { IMessageService } from "../service/message.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface IMessageController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  askchatbot(req: Request, res: Response):void;
  reclamtionReplyMessage(req: Request, res: Response):void;
}

export class MessageController implements IMessageController {
  constructor(private messageService: IMessageService) {}

  async create(req: Request, res: Response) {
    try {
      const message = req.body;
      const data = await this.messageService.createMessage(message);
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
      const message = await this.messageService.getMessage(id);
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async askchatbot(req: Request, res: Response) {
    try {
      const messageprompt = req.body.message;
     const id =req.params.id;
      const message = await this.messageService.askchatbot(id,messageprompt);
      res.json(message);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }


  async reclamtionReplyMessage(req: Request, res: Response) {
    try {
      const message = req.body.message;
     const iduser =req.params.idUser;
     const idReclamation =req.params.idReclamation;
     const replay = await this.messageService.reclamtionReplyMessage(message,iduser,idReclamation);

      res.json(replay);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }


  async getAll(req: Request, res: Response) {
    try {
      const messages = await this.messageService.allMessages();
      res.json(messages);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const message = req.body;
      await this.messageService.updateMessage(id, message);
      res.json({ message: "Message updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.messageService.deleteMessage(id);
      res.json({ message: "Message deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}
