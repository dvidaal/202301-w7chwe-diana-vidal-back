import bcryptjs from "bcryptjs";
import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import { type UserStructure } from "../types.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Couldn't show the users"
    );
    next(customError);
  }
};

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 8);
    const avatar = req.file?.originalname;

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    res.status(201).json({ username });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Impossible to create a user"
    );

    next(customError);
  }
};
