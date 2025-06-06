import { prisma } from '../lib/prismaClient';
import { CreateAllocationInput } from '../schemas/allocation.schema';

export const findAllocationsByClientId = async (clientId: string) => {
  const allocations = await prisma.allocation.findMany({
    where: {
      clientId: clientId,
    },
    include: { 
      asset: true,
    },
    orderBy: {
      assignedAt: 'desc',
    },
  });

  return allocations.map(alloc => ({
    ...alloc,
    asset: {
      ...alloc.asset,
      currentValue: alloc.asset.currentValue.toNumber(),
    }
  }));
};


export const createAllocation = async (clientId: string, input: CreateAllocationInput) => {
  const { assetId, quantity } = input;

  const allocation = await prisma.allocation.create({
    data: {
      clientId,
      assetId,
      quantity,
    },
    include: { 
      asset: true,
    },
  });

  return {
    ...allocation,
    asset: {
      ...allocation.asset,
      currentValue: allocation.asset.currentValue.toNumber()
    }
  };
};