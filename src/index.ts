import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoute";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import { connectMongoDB } from "./config/mongodb/db";
import { UserRepository } from "./repositories/mongodb/userRepository";
import { EventRepository } from "./repositories/mongodb/eventRepository";
import { EventController } from "./controllers/eventController";
import { EventService } from "./services/eventService";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectMongoDB();

const userRepository = new UserRepository();
const eventRepository = new EventRepository();
const userService = new UserService(userRepository);
const eventService = new EventService(eventRepository);

const userController = new UserController(userService);
const eventController = new EventController(eventService);
const authController = new AuthController(userService);

app.use(express.json());
app.use(loggingMiddleware);

app.use("/api/users", userRoutes(userController));
app.use("/api/events", eventRoutes(eventController));
app.use("/api/auth", authRoutes(authController));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
