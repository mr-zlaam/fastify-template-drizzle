import type { FastifyInstance } from "fastify";
import Performancehandler from "./applicationHealth.handler";
import { rateLimit } from "../../utils/globalUtils/ratelimit.utils";

export default async function applicationHealthRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      ...rateLimit(2, "1 minute")
    },
    Performancehandler.getPerformance
  );
}
