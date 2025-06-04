
import type { FastifyInstance } from 'fastify';
import { getStaticAssetsHandler } from '../controllers/asset.controller';
import { assetsResponseSchema } from '../schemas/asset.schemas';

export async function assetRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: assetsResponseSchema,
        },
      },
    },
    getStaticAssetsHandler
  );

  server.log.info('Static asset routes registered');
}