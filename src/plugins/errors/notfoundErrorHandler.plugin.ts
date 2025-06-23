import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.setNotFoundHandler((req, reply) => {
    reply.code(404).send({
      success: false,
      statusCode: 404,
      message: `This route (${req.raw.url}) doesn't exist on server`,
      data: null
    });
  });
});
