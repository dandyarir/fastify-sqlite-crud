import fastify, { FastifyInstance } from 'fastify'
import { IndexRoutes } from './routes/index.route';
import { CONF_ENV, PORT, SERVER_URL, SWAGGER_APP_NAME, SWAGGER_CONTACT_MAIL, SWAGGER_DESC, SWAGGER_VERSION } from './config/config';
const fastifyOpenapiDocs = import("fastify-openapi-docs");

const app: FastifyInstance = fastify({
  logger: true
});
// Start the server
const start = async () => {
  await app.register(fastifyOpenapiDocs, {
    openapi: {
      openapi: '3.0.3',
      info: {
        title: SWAGGER_APP_NAME,
        version: SWAGGER_VERSION,
        description: SWAGGER_DESC,
        contact: {
          email: SWAGGER_CONTACT_MAIL,
        },
      },
      persistAuthorization: true,
      produces: ["application/json"],
      schemes: ["https", "http"],
      servers: [
        { url: `http://${SERVER_URL}`, description: 'Development Server' },
      ],
      basePath: "/",
      tags: [{ name: 'Simple CRUD', description: 'Simple CRUD' }],
      components: {}
    },
    exposeRoute: true
  });

  IndexRoutes(app)
  app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`🚀 API Server (${CONF_ENV}) listening on ${SERVER_URL}`);
    
  });
};

start();