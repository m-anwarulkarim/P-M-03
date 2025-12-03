import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

//users CRUD
router.post("/users", userController.createUser);

router.get("/users", userController.getUsers);

router.get("/users/:id", userController.getSingelUser);

router.put("/users/:id", userController.updateUser);

router.delete("/users/:id", userController.deletUser);

export const userRouter = router;
