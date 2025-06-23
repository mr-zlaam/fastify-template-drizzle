import type { SwaggerOptions } from "@fastify/swagger";
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import type { FastifyRegisterOptions } from "fastify";

export const swaggerOptions: FastifyRegisterOptions<SwaggerOptions> = {
  swagger: {
    info: {
      title: "Api Documentation",
      version: "1.0.0"
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "auth", description: "Authentication routes" }]
  }
};
export const swaggerUiOptions: FastifyRegisterOptions<FastifySwaggerUiOptions> = {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false
  }
};
