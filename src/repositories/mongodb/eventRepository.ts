import { IEventRepository, IEvent } from "../../interfaces/eventInterface";
import { EventModel } from "../../models/eventModel";

export class EventRepository implements IEventRepository {
  async create(eventData: Omit<IEvent, "id">): Promise<IEvent> {
    const event = new EventModel(eventData);
    return await event.save();
  }

  async findAll(): Promise<IEvent[]> {
    return await EventModel.find().populate("user_id");
  }
}
