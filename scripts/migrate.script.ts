import { database } from "../src/db/db";
import logger from "../src/utils/globalUtils/logger.utils";
import { throwError } from "../src/utils/globalUtils/throwError.utils";
void (async function () {
  await database
    .runMigrations()
    .then(() => {
      logger.info("Migrations ran successfully");
      process.exit(0);
    })
    .catch((err) => {
      logger.error("Error running migrations", { error: err });
      if (err instanceof Error) throwError(500, err.message);
      throwError(500, "Something went wrong while migrating to the database");
      process.exit(1);
    });
})();
