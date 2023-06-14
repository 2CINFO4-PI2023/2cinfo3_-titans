import { Request, Response } from "express";
import { IReclamationService } from "../service/reclamation.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface IReclamationController {
  create(req: Request, res: Response): void;
}
export class ReclamationController {
  constructor(private reclamationService: IReclamationService) {}
  async create(req: Request, res: Response) {
    try {
      const reclamation = req.body;
      const data = await this.reclamationService.createReclamation(reclamation);
      res.status(201).json(data);
    } catch (error:any) {
      if (error instanceof DuplicatedError){
        return res.status(error.http_code).json({message:error.message,description:error.description})
      }
      res.status(500).send(error);
    }
  }
}
