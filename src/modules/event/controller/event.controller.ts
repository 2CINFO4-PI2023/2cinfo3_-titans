import { Request, Response } from "express";
import { IEventService } from "../service/event.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface IEventController {
  create(req: Request, res: Response): void;
}
export class EventController {
  constructor(private eventService: IEventService) {}
  async create(req: Request, res: Response) {
    try {
      const event = req.body;
      const data = await this.eventService.createEvent(event);
      res.status(201).json(data);
    } catch (error:any) {
      if (error instanceof DuplicatedError){
        return res.status(error.http_code).json({message:error.message,description:error.description})
      }
      res.status(500).send(error);
    }
  }
}
