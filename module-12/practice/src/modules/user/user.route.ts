import { Router } from "express";
import { userController } from "./user.controller.js";
import auth from "../../middleware/auth.js";

const router = Router();

//users CRUD
router.post("/users", userController.createUser);

router.get("/users", auth("admin"), userController.getUsers);

router.get("/users/:id", userController.getSingelUser);

router.put("/users/:id", userController.updateUser);

router.delete("/users/:id", userController.deletUser);

export const userRouter = router;
