import Fastify from "fastify";
import defaultRoutes from "./routes/default.router";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { swaggerOptions, swaggerUiOptions } from "./configs/swagger.config";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";

export const app = Fastify();

await app.register(fastifyHelmet, { global: true });
await app.register(fastifyRateLimit, {
  global: false,
  addHeaders: {
    "x-ratelimit-limit": true,
    "x-ratelimit-remaining": true,
    "x-ratelimit-reset": true
  }
});

// Then register routes
await app.register(swagger, swaggerOptions);
await app.register(swaggerUi, swaggerUiOptions);
app.register(import("./plugins/database/db.plugin"));
app.register(defaultRoutes, { prefix: "/api/v1" });
app.register(import("./plugins/errors/errorHandler.plugin"));
app.register(import("./plugins/errors/notfoundErrorHandler.plugin"));

// Register Swagger last
