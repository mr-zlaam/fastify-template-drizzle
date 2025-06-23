import type { FastifyInstance } from "fastify";
import applicationHealthRoutes from "../features/applicationHealth/applicationHealth.router";

export default async function defaultRoutes(fastify: FastifyInstance) {
  fastify.register(applicationHealthRoutes, { prefix: "/health" });
}
