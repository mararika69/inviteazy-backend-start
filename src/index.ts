import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoute"; // ✅ Import event routes
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";
import { connectMongoDB } from "./config/mongodb/db";
// import { connectPostgresDb } from "./config/postgresdb/db";
// import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { UserRepository } from "./repositories/mongodb/userRepository";
import { EventRepository } from "./repositories/mongodb/eventRepository"; // ✅ Add EventRepository
import { EventController } from "./controllers/eventController";
import { EventService } from "./services/eventService";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 🔌 Connect to MongoDB
connectMongoDB();

// Optional: PostgreSQL setup
// const pgPool = connectPostgresDb();
// const userRepository = new PostgresUserRepository(pgPool);

// 🧱 Repositories & Services
const userRepository = new UserRepository();
const eventRepository = new EventRepository(); // ✅ Instantiate EventRepository
const userService = new UserService(userRepository);
const eventService = new EventService(eventRepository);

// 🎮 Controllers
const userController = new UserController(userService);
const eventController = new EventController(eventService); // ✅ Pass eventService
const authController = new AuthController(userService);

// 🛡️ Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// 🔗 Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/events", eventRoutes(eventController)); // ✅ Pass controller
app.use("/api/auth", authRoutes(authController));

// ❌ Error Handling
app.use(errorMiddleware);

// 🚀 Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
