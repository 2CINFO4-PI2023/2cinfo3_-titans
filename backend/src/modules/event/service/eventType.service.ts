import { IEventType } from "../model/eventType.schema";
import { IEventTypeRepository } from "../repository/eventType.repository";


export interface IEventTypeService {
  createEventType(eventType: IEventType): Promise<IEventType>;
  getAllEventTypes(): Promise<IEventType[]>;
  getEventTypeById(id: string): Promise<IEventType | null>;
  updateEventType(id: string, eventType: IEventType): Promise<void>;
  deleteEventType(id: string): Promise<void>;
}

export class EventTypeService implements IEventTypeService {
  constructor(private eventTypeRepository: IEventTypeRepository) {}

  async createEventType(eventType: IEventType): Promise<IEventType> {
    return this.eventTypeRepository.create(eventType);
  }

  async getAllEventTypes(): Promise<IEventType[]> {
    return this.eventTypeRepository.getAll();
  }

  async getEventTypeById(id: string): Promise<IEventType | null> {
    return this.eventTypeRepository.getById(id);
  }

  async updateEventType(id: string, eventType: IEventType): Promise<void> {
    return this.eventTypeRepository.update(id, eventType);
  }

  async deleteEventType(id: string): Promise<void> {
    return this.eventTypeRepository.delete(id);
  }
}
