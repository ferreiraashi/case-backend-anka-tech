import type { FastifyInstance } from 'fastify';
import { getAssetsHandler } from '../controllers/asset.controller';
import { assetsResponseSchema } from '../schemas/asset.schemas';

export async function assetRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        tags: ['Assets'],
        response: {
          200: assetsResponseSchema,
        },
      },
    },
    getAssetsHandler 
  );
}