import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const server = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

server.get('/', async (request, reply) => {
  return { hello: 'world from Anka Tech backend!' };
});

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' }); 
    server.log.info(`Servidor rodando em http://localhost:3001`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();