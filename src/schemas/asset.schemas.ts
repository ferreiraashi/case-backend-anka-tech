import { z } from 'zod';

export const assetResponseSchema = z.object({
  name: z.string({
    description: 'Nome do ativo financeiro',
  }),
  currentValue: z.number({
    description: 'Valor atual do ativo financeiro', 
  }),
});

export const assetsResponseSchema = z.array(assetResponseSchema, {
  description: 'Uma lista de ativos financeiros com seus valores atuais', 
});


export type AssetResponse = z.infer<typeof assetResponseSchema>;
export type AssetsResponse = z.infer<typeof assetsResponseSchema>;