import { Router } from "express";
import { todoControllers } from "./todo.controller.js";

const router = Router();

router.post("/todo", todoControllers.createTodo);

router.get("/todo", todoControllers.getTodos);

router.get("/todo/:id", todoControllers.getSingleTodo);

router.put("/todo/:id", todoControllers.updateTodo);

router.delete("/todo/:id", todoControllers.deleteTodo);

export const todoRoutes = router;
