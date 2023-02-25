import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("users:database");

const connectDataBase = async (mongoDbUrl: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(mongoDbUrl);
    debug("Connected to database");
  } catch (error: unknown) {
    debug("Not possible to connect to database", (error as Error).message);
  }
};

export default connectDataBase;
