import { IEvent } from "../model/event.schema";
import { IEventRepository } from "../repository/event.repository";

export interface IEventService {
  createEvent(event: IEvent): IEvent | Promise<IEvent>;
  getEvent(id: string): IEvent;
  allEvents(): IEvent[];
  deleteEvent(id: string): void;
  updateEvent(id: string, event: IEvent): void;
}

export class EventService implements IEventService {

  constructor(private eventRepository: IEventRepository) {}
  
  async createEvent(event: IEvent): Promise<IEvent> {
    try {
      return await this.eventRepository.create(event)
    } catch (error) {
      throw error
    }
  }
  getEvent(id: string): IEvent {
    throw new Error("not implemented yet");
  }
  allEvents(): IEvent[] {
    throw new Error("not implemented yet");
  }
  deleteEvent(id: string): void {
    throw new Error("not implemented yet");
  }
  updateEvent(id: string, event: IEvent): void {
    throw new Error("not implemented yet");
  }
}
