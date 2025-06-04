import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório.',
    invalid_type_error: 'O nome deve ser uma string.',
  }).min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),

  email: z.string({
    required_error: 'O email é obrigatório.',
  }).email({ message: 'Formato de email inválido.' }),

  status: z.enum(['ativo', 'inativo'], {
    required_error: 'O status é obrigatório.',
    invalid_type_error: 'O status deve ser "ativo" ou "inativo".',
  }),
});

export const updateClientSchema = z.object({
  name: z.string({
    invalid_type_error: 'O nome deve ser uma string.',
  }).min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }).optional(),

  email: z.string()
    .email({ message: 'Formato de email inválido.' })
    .optional(),

  status: z.enum(['ativo', 'inativo'], {
    invalid_type_error: 'O status deve ser "ativo" ou "inativo".',
  }).optional(),
});


export const clientIdParamsSchema = z.object({
  id: z.string().uuid({ message: 'O ID do cliente deve ser um UUID válido.' }),
});

export const clientResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  status: z.enum(['ativo', 'inativo']),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()), 
  updatedAt: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

export const clientsResponseSchema = z.array(clientResponseSchema);


export type ClientResponse = z.infer<typeof clientResponseSchema>;
export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type ClientIdParams = z.infer<typeof clientIdParamsSchema>;