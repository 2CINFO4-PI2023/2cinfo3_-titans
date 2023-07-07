import { Schema, model, Document } from "mongoose";
import { Event } from "./event.schema";

export interface IEventType extends Document {
  name: string;
  description: string;
  
}

const eventTypeSchema = new Schema<IEventType>({
  name: { type: String, required: true },
  description: { type: String },
  
});

eventTypeSchema.statics.getEventCountByType = async function () {
  const eventCounts = await Event.aggregate([
    {
      $group: {
        _id: "$eventType",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "events",
        localField: "_id",
        foreignField: "eventType",
        as: "eventType",
      },
      
    },
    {
      $project: {
        _id: 1,
        name: { $arrayElemAt: ["$eventType.name", 0] },
        count: 1,
      },
    },
  ]);

  return eventCounts;
};

export const EventType = model<IEventType>("EventType", eventTypeSchema);
