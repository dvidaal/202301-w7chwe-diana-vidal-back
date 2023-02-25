import { Router } from "express";
import {
  createUser,
  getUsers,
  loginUser,
} from "../../controllers/usersControllers.js";
import multer from "multer";

export const usersRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage });

usersRouter.get("/get", getUsers);
usersRouter.post("/login", loginUser);
usersRouter.post("/create", upload.single("avatar"), createUser);
