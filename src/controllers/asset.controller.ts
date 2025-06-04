import type { FastifyRequest, FastifyReply } from 'fastify';

// Lista fixa de ativos financeiros
const staticAssets = [
  { name: "Ação Direta", currentValue: 150.75 },
  { name: "Fundo Brasil", currentValue: 1200.00 },
  { name: "Tesouro Direto Z", currentValue: 99.50 },
  { name: "CriptoMoeda BTC", currentValue: 350000.00 },
  { name: "Vale Ações", currentValue: 250.20 }
];

export const getStaticAssetsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    return reply.status(200).send(staticAssets);
  } catch (error) {
    request.log.error(error, "Erro ao buscar ativos estáticos");
    return reply.status(500).send({ message: 'Erro interno ao buscar ativos.' });
  }
};