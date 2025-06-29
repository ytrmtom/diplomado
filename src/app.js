import express from "express";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import { authenticateToken } from "./middlewares/authenticate.js";
import tasksRoutes from "./routes/task.routes.js";

const app = express();


//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/login", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tasks", authenticateToken, tasksRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
