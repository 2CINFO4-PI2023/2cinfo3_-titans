import { IEvent } from "../model/event.schema";
import { IEventRepository } from "../repository/event.repository";

export interface IEventService {
  createEvent(event: IEvent): IEvent | Promise<IEvent>;
  getEvent(id: string): Promise<IEvent | null>;
  allEvents(): Promise<IEvent[]>;
  deleteEvent(id: string): void;
  updateEvent(id: string, event: IEvent): void;
}

export class EventService implements IEventService {
  constructor(private eventRepository: IEventRepository) {}

  async createEvent(event: IEvent): Promise<IEvent> {
    try {
      return await this.eventRepository.create(event);
    } catch (error) {
      throw error;
    }
  }

  async getEvent(id: string): Promise<IEvent | null> {
    try {
      return await this.eventRepository.get(id);
    } catch (error) {
      throw error;
    }
  }

  async allEvents(): Promise<IEvent[]> {
    try {
      return await this.eventRepository.all();
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await this.eventRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(id: string, event: IEvent): Promise<void> {
    try {
      await this.eventRepository.update(id, event);
    } catch (error: any) {
      throw error;
    }
  }
}
