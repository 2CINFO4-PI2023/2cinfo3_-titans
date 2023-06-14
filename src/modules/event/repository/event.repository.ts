import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IEvent, Event } from "../model/event.schema";

export interface IEventRepository {
  create(event: IEvent): IEvent | Promise<IEvent>;
  get(id: string): IEvent;
  all(): IEvent[];
  delete(id: string): void;
  update(id: string, event: IEvent): void;
}

export class EventRepository implements IEventRepository {
  constructor() {}
  async create(event: IEvent): Promise<IEvent> {
    try {
      const doc = await Event.create(event);
      return doc;
    } catch (error: any) {
  
      throw error;
    }
  }
  get(id: string): IEvent {
    throw new Error("not implemented yet");
  }
  all(): IEvent[] {
    throw new Error("not implemented yet");
  }
  delete(id: string): void {
    throw new Error("not implemented yet");
  }
  update(id: string, event: IEvent): void {
    throw new Error("not implemented yet");
  }
}
