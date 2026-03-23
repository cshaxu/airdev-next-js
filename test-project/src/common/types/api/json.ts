import * as z from 'zod';

export const CreateChatBody = z.object({});
export type CreateChatBody = z.infer<typeof CreateChatBody>;

export const CreateChatResponse = z.object({
  chat: z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
  }),
});
export type CreateChatResponse = z.infer<typeof CreateChatResponse>;
