import mongoose from "mongoose";
import chalk from "chalk";
import createDebug from "debug";

const debug = createDebug("users:database");

const connectDataBase = async (mongoDbUrl: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(mongoDbUrl);
    debug(chalk.green("Connected to database"));
  } catch (error: unknown) {
    debug(
      chalk.red("Not possible to connect to database", (error as Error).message)
    );
  }
};

export default connectDataBase;
