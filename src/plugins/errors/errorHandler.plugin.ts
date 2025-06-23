import fp from "fastify-plugin";
import { DrizzleError } from "drizzle-orm";

export default fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = (error as unknown as { statusCode?: number }).statusCode || 500;
    const message = error instanceof DrizzleError ? "Something went wrong while working with Drizzle!!" : error.message || "Internal Server Error!!";

    const errObject = {
      success: false,
      statusCode,
      message,
      data: null,
      requestInfo: {
        url: request.raw.url,
        method: request.raw.method,
        ...(process.env.NODE_ENV !== "production" && { ip: request.ip })
      },
      ...(process.env.NODE_ENV !== "production" && {
        stack: error.stack || "No stack trace"
      })
    };

    reply.status(statusCode).send(errObject);
  });
});
