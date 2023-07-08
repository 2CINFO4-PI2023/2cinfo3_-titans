import { EventType, IEventType } from "../model/eventType.schema";


export interface IEventTypeRepository {
  create(eventType: IEventType): Promise<IEventType>;
  getAll(): Promise<IEventType[]>;
  getById(id: string): Promise<IEventType | null>;
  update(id: string, eventType: IEventType): Promise<void>;
  delete(id: string): Promise<void>;
}

export class EventTypeRepository implements IEventTypeRepository {
  async create(eventType: IEventType): Promise<IEventType> {
    return EventType.create(eventType);
  }

  async getAll(): Promise<IEventType[]> {
    return EventType.find().exec();
  }

  async getById(id: string): Promise<IEventType | null> {
    return EventType.findById(id).exec();
  }

  async update(id: string, eventType: IEventType): Promise<void> {
    await EventType.findByIdAndUpdate(id, eventType).exec();
  }

  async delete(id: string): Promise<void> {
    await EventType.findByIdAndDelete(id).exec();
  }
}
