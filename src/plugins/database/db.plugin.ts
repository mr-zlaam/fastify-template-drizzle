import fp from "fastify-plugin";
import { database } from "../../db/db";
export default fp(async (fastify) => {
  fastify.decorate("db", database.db);
});

declare module "fastify" {
  interface FastifyInstance {
    db: typeof database.db;
  }
}
