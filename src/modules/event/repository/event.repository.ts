import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IEvent, Event } from "../model/event.schema";

export interface IEventRepository {
  create(event: IEvent): Promise<IEvent>;
  get(id: string): Promise<IEvent | null>;
  all(): Promise<IEvent[]>;
  delete(id: string): Promise<void>;
  update(id: string, event: IEvent): Promise<void>;
  getEventById(id: string): Promise<IEvent | null>;
}

export class EventRepository implements IEventRepository {
  constructor() {}

  async create(event: IEvent): Promise<IEvent> {
    try {
      const doc = await Event.create(event);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("Event already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<IEvent | null> {
    try {
      const doc = await Event.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<IEvent[]> {
    try {
      const docs = await Event.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Event.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, event: IEvent): Promise<void> {
    try {
      await Event.findByIdAndUpdate(id, event);
    } catch (error: any) {
      throw error;
    }
  }

  async getEventById(id: string): Promise<IEvent | null> {
    try {
      const event = await Event.findById(id);
      return event;
    } catch (error: any) {
      throw error;
    }
  }
}
