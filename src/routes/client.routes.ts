import type { FastifyInstance } from 'fastify';
import {
  createClientHandler,
  getClientsHandler,
  getClientByIdHandler,
  updateClientHandler,
  deleteClientHandler,
} from '../controllers/cliente.controller';
import {
  createClientSchema,
  updateClientSchema,
  clientIdParamsSchema,
  clientResponseSchema,
  clientsResponseSchema
} from '../schemas/client.schemas';

export  async function clientRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: createClientSchema,
        response: { 201: clientResponseSchema }
      },
    },
    createClientHandler
  );

  // Rota para listar todos os clientes
  server.get(
    '/',
    { schema: { response: { 200: clientsResponseSchema } } },
    getClientsHandler
  );

  // Rota para buscar um cliente por ID
  server.get(
    '/:id',
    {
      schema: {
        params: clientIdParamsSchema,
      },
    },
    getClientByIdHandler
  );

  // Rota para atualizar um cliente por ID
  server.put(
    '/:id',
    {
      schema: {
        body: updateClientSchema,
        params: clientIdParamsSchema, 
      },
    },
    updateClientHandler
  );

  // Rota para deleter um cliente pelo ID
  server.delete(
    '/:id',
    {
      schema: {
        params: clientIdParamsSchema,
      },
    },
    deleteClientHandler
  );

  server.log.info('Client routes registered');
}