import { app } from "./app.js";
import createDebug from "debug";
import chalk from "chalk";

const debug = createDebug("users");

export const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgCyanBright(
          chalk.green(`Server listening on port http://localhost:${port}`)
        )
      );
      resolve(server);
    });
  });
