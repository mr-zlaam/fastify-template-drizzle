import { app } from "./app";
import envConfig from "./configs/env.config";
import { database } from "./db/db";
import logger from "./utils/globalUtils/logger.utils";
void (async function StartServer() {
  await database.connect().then(() => {
    app.listen({ port: envConfig.PORT }, (err, address) => {
      if (err) {
        logger.error("ERRR:: Unable to connection with database", { err });
        process.exit(1);
      }
      logger.info(`✅ Database connected successfully \n  Server is running on ${address}`);
    });
  });
})();
