import { Request, Response } from "express";
import { IEventService } from "../service/event.service";
import { DuplicatedError } from "../../../errors/DuplicatedError";

export interface IEventController {
  create(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
  getAll(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export class EventController implements IEventController {
  constructor(private eventService: IEventService) {}

  async create(req: Request, res: Response) {
    try {
      const event = req.body;
      const data = await this.eventService.createEvent(event);
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
      const event = await this.eventService.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const events = await this.eventService.allEvents();
      res.json(events);
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const event = req.body;
      await this.eventService.updateEvent(id, event);
      res.json({ message: "Event updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.eventService.deleteEvent(id);
      res.json({ message: "Event deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  }
}