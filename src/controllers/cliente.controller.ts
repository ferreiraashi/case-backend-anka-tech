import type { FastifyRequest, FastifyReply } from 'fastify';
import * as ClientService from '../services/client.service';
import type { CreateClientInput, UpdateClientInput, ClientIdParams } from '../schemas/client.schemas'; 

// Controller para criar um novo cliente
export const createClientHandler = async (
  request: FastifyRequest<{ Body: CreateClientInput }>, 
  reply: FastifyReply
) => {
  try {
    const clientData = request.body; 
    const client = await ClientService.createClient(clientData);
    return reply.status(201).send(client);
  } catch (error: any) {
    console.error("Erro ao criar cliente:", error); 

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return reply.status(409).send({ message: 'Este email já está em uso.' }); 
    }
    return reply.status(500).send({ message: 'Erro interno ao criar cliente.' });
  }
};

// Controller para listar todos os clientes
export const getClientsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const clients = await ClientService.findClients();
    return reply.status(200).send(clients); 
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return reply.status(500).send({ message: 'Erro interno ao listar clientes.' });
  }
};

// Controller para buscar um cliente por ID
export const getClientByIdHandler = async (
  request: FastifyRequest<{ Params: ClientIdParams }>, 
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const client = await ClientService.findClientById(id);
    if (!client) {
      return reply.status(404).send({ message: 'Cliente não encontrado.' }); 
    }
    return reply.status(200).send(client); 
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    return reply.status(500).send({ message: 'Erro interno ao buscar cliente.' });
  }
};

// Controller para atualizar um cliente por ID
export const updateClientHandler = async (
  request: FastifyRequest<{ Body: UpdateClientInput; Params: ClientIdParams }>, 
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const existingClient = await ClientService.findClientById(id);
    if (!existingClient) {
      return reply.status(404).send({ message: 'Cliente não encontrado para atualização.' }); 
    }

    const updatedClient = await ClientService.updateClientById(id, updateData);
    return reply.status(200).send(updatedClient);
  } catch (error: any) {
    console.error("Erro ao atualizar cliente:", error);
     if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return reply.status(409).send({ message: 'Este email já está em uso por outro cliente.' });
    }
    if (error.code === 'P2025') {
        return reply.status(404).send({ message: 'Cliente não encontrado para atualização (P2025).' });
    }
    return reply.status(500).send({ message: 'Erro interno ao atualizar cliente.' });
  }
};

// Controller para deletar um cliente
export const deleteClientHandler = async (
  request: FastifyRequest<{ Params: ClientIdParams }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const existingClient = await ClientService.findClientById(id);
    if (!existingClient) {
      return reply.status(404).send({ message: 'Cliente não encontrado para exclusão.' });
    }
    await ClientService.deleteClientById(id);
    return reply.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return reply.status(500).send({ message: 'Erro interno ao deletar cliente.' });
  }
};