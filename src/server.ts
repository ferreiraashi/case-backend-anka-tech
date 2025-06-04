import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider, 
} from 'fastify-type-provider-zod';
import { clientRoutes } from './routes/client.routes';

const server = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>(); 

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get('/healthcheck', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

server.register(clientRoutes, { prefix: '/api/clients' });

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();