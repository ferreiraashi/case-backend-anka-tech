import Fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider, 
} from 'fastify-type-provider-zod';
import { clientRoutes } from './routes/client.routes';
import { assetRoutes } from './routes/asset.routes';
import fastifyCors from '@fastify/cors';

const server = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>(); 

server.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get('/healthcheck', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Rotas de cliente
server.register(clientRoutes, { prefix: '/api/clients' });

// Rotas de ativos
server.register(assetRoutes, { prefix: '/api/assets' });

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();