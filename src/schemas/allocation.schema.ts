import { z } from 'zod';

export const createAllocationSchema = z.object({
  assetId: z.string().uuid({ message: '' }),
  quantity: z.number().int().positive({ message: 'A quantidade deve ser um número inteiro positivo.' }),
});

export type CreateAllocationInput = z.infer<typeof createAllocationSchema>;