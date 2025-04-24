import { Request, Response } from "express";
import { IEventService } from "../interfaces/eventInterface";
import { IEvent } from "../interfaces/eventInterface";

export class EventController {
  constructor(private eventService: IEventService) {}
  
  async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const newEvent = await this.eventService.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: "Error creating event", error });
    }
  }

  async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const events = await this.eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to get events", error });
    }
  }
}
