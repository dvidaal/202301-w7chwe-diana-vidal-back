import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
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

export default getUsers;
