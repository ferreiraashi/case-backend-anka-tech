import type { FastifyRequest, FastifyReply } from 'fastify';
import * as AssetService from '../services/asset.service';

export const getAssetsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const assets = await AssetService.findAssets();
    return reply.status(200).send(assets);
  } catch (error) {
    request.log.error(error, "Erro ao buscar ativos");
    return reply.status(500).send({ message: 'Erro interno ao buscar ativos.' });
  }
};