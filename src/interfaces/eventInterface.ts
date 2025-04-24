import { Types } from "mongoose";

export interface IUser {
  id?: string;
  full_name: string;
  email: string;
}

export interface IEvent {
  id?: string;
  user_id: string | Types.ObjectId | IUser; 
  event_name: string;
  event_datetime: Date;
  location: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEventRepository {
  findAll(): Promise<IEvent[]>;
  create(event: Omit<IEvent, "id">): Promise<IEvent>;
}

export interface IEventService {
  createEvent(event: Omit<IEvent, "id">): Promise<IEvent>;
  getAllEvents(): Promise<IEvent[]>;
}
