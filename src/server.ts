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
  origin: true
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get('/healthcheck', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Registrar as rotas de cliente com um prefixo
server.register(clientRoutes, { prefix: '/api/clients' });

// 2. Registrar as rotas de ativos com um prefixo
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