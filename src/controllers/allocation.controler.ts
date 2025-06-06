import type { FastifyRequest, FastifyReply } from 'fastify';
import * as AllocationService from '../services/allocation.service';
import type { CreateAllocationInput } from '../schemas/allocation.schema';
import type { ClientIdParams } from '../schemas/client.schemas';

export const getAllocationsHandler = async (
  request: FastifyRequest<{ Params: ClientIdParams }>,
  reply: FastifyReply
) => {
  try {
    const { id: clientId } = request.params;
    const allocations = await AllocationService.findAllocationsByClientId(clientId);
    return reply.status(200).send(allocations);
  } catch (error) {
    request.log.error(error, "Erro ao buscar alocações do cliente");
    return reply.status(500).send({ message: 'Erro interno ao buscar alocações.' });
  }
};


export const createAllocationHandler = async (
  request: FastifyRequest<{ Body: CreateAllocationInput; Params: ClientIdParams }>,
  reply: FastifyReply
) => {
  try {
    const { id: clientId } = request.params;
    const allocationData = request.body;
    const newAllocation = await AllocationService.createAllocation(clientId, allocationData);
    return reply.status(201).send(newAllocation);
  } catch (error) {
    request.log.error(error, "Erro ao criar alocação para o cliente");
    return reply.status(500).send({ message: 'Erro interno ao criar alocação.' });
  }
};