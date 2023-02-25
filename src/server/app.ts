import express from "express";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "./routers/usersRouters/usersRouters.js";

export const app = express();
app.use(cors());
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);
