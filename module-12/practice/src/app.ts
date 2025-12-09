import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db.js";
import { loggerMiddleware } from "./middleware/logger.js";
import { userRouter } from "./modules/user/user.route.js";
import { todoRoutes } from "./modules/todo/todo.route.js";
import { authRouter } from "./modules/auth/auth.route.js";

const app = express();

// parser
app.use(express.json());

app.use(loggerMiddleware);

// initializing DB
initDB();

// users
app.use(userRouter);
app.use(todoRoutes);
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

// todos crud

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
