import type { RouteShorthandOptions } from "fastify";

export const rateLimit = (max: number, timeWindow: string, allowList: string[] = []): RouteShorthandOptions => ({
  config: {
    rateLimit: {
      max,
      timeWindow,
      allowList,
      errorResponseBuilder: (_, context) => ({
        statusCode: 429,
        error: "Too Many Requests",
        message: `Limit hit. Try again in ${context.after} seconds.`
      })
    }
  }
});
