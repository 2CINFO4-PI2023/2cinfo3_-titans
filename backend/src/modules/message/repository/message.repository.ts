import { DuplicatedError } from "../../../errors/DuplicatedError";
import { IMessage, Message } from "../model/message.schema";

export interface IMessageRepository {
  create(message: IMessage): Promise<IMessage>;
  get(id: string): Promise<IMessage | null>;
  all(): Promise<IMessage[]>;
  delete(id: string): Promise<void>;
  update(id: string, message: IMessage): Promise<void>;
  byUser(userId: string): Promise<IMessage[]>;
}

export class MessageRepository implements IMessageRepository {
  constructor() {}

  async create(message: IMessage): Promise<IMessage> {
    try {
      const doc = await Message.create(message);
      return doc;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key error
        throw new DuplicatedError("Message already exists");
      }
      throw error;
    }
  }

  async get(id: string): Promise<IMessage | null> {
    try {
      const doc = await Message.findById(id);
      return doc;
    } catch (error: any) {
      throw error;
    }
  }

  async all(): Promise<IMessage[]> {
    try {
      const docs = await Message.find();
      return docs;
    } catch (error: any) {
      throw error;
    }
  }

  
  async byUser(userId: string): Promise<IMessage[]> {
    try {
      const messages = await Message.find({ user: userId }, null, { sort: { date_creation: 1 } });
      return messages;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Message.findByIdAndDelete(id);
    } catch (error: any) {
      throw error;
    }
  }

  async update(id: string, message: IMessage): Promise<void> {
    try {
      await Message.findByIdAndUpdate(id, message);
    } catch (error: any) {
      throw error;
    }
  }
}