import "./loadEnvironment.js";
import chalk from "chalk";
import debug from "debug";
import connectDataBase from "./database/connectDataBase.js";
import { startServer } from "./server/startServer.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_CONNECTION_URL;

try {
  await connectDataBase(mongoDbUrl!);
  debug(chalk.green("Connected to data base"));

  await startServer(+port);
} catch (error) {
  debug(error.message);
}
