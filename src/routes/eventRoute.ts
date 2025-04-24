import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { EventService } from "../services/eventService";
import { EventRepository } from "../repositories/mongodb/eventRepository";

const router = Router();

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const controller = new EventController(eventService);

export default function eventRoute(controller: EventController): Router {
  const router = Router();

router.post("/event", (req, res) => controller.createEvent(req, res));
router.get("/all", (req, res) => controller.getAllEvents(req, res));

return router;
}