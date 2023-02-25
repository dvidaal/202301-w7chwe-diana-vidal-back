import { Router } from "express";
import getUsers from "../../controllers/usersControllers.js";

export const usersRouter = Router();

usersRouter.get("/", getUsers);
