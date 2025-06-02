import { prisma } from "../lib/prismaClient";
import type {
  CreateClientInput,
  UpdateClientInput,
} from "../schemas/client.schemas";


//criar um cliente
export const createClient = async (input: CreateClientInput) => {
  const { name, email, status } = input;
  const client = await prisma.client.create({
    data: {
      name,
      email,
      status,
    },
  });
  return client;
};

// listar os clientes
export const findClients = async () => {
  const clients = await prisma.client.findMany();
  return clients;
};

//encontrar pelo id do cliente
export const findClientById = async (id: string) => {
  const client = await prisma.client.findUnique({
    where: { id },
  });
  return client;
};

//atualizar cliente
export const updateClientById = async (
  id: string,
  input: UpdateClientInput
) => {
  if (Object.keys(input).length === 0) {
    const existingClient = await prisma.client.findUnique({ where: { id } });
    if (!existingClient) {
      return null;
      return existingClient;
    }
  }

  const client = await prisma.client.update({
    where: { id },
    data: input,
  });
  return client;
};

//deletar cliente
export const deleteClientById = async (id: string) => {
  await prisma.client.delete({
    where: { id },
  });
};
