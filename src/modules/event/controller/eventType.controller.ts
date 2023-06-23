import { Request, Response } from "express";
import { IEventTypeService } from "../service/eventType.service";
import { IEventType } from "../model/eventType.schema";


export class EventTypeController {
  constructor(private eventTypeService: IEventTypeService) {}

  createEventType = async (req: Request, res: Response): Promise<void> => {
    try {
      const eventType: IEventType = req.body;
      const createdEventType = await this.eventTypeService.createEventType(eventType);
      res.status(201).json(createdEventType);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  getAllEventTypes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const eventTypes = await this.eventTypeService.getAllEventTypes();
      res.json(eventTypes);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  getEventTypeById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const eventType = await this.eventTypeService.getEventTypeById(id);
      if (!eventType) {
        res.status(404).json({ message: "EventType not found" });
        return;
      }
      res.json(eventType);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  updateEventType = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const eventType: IEventType = req.body;
      await this.eventTypeService.updateEventType(id, eventType);
      res.json({ message: "EventType updated successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  deleteEventType = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      await this.eventTypeService.deleteEventType(id);
      res.json({ message: "EventType deleted successfully" });
    } catch (error: any) {
      res.status(500).send(error);
    }
  };
}
