import * as z from 'zod';

export const GetOneChatParams = z.object({ id: z.string() });
export type GetOneChatParams = z.infer<typeof GetOneChatParams>;

export const UpdateOneChatBody = z.object({ clear: z.boolean().optional() });
export type UpdateOneChatBody = z.infer<typeof UpdateOneChatBody>;
