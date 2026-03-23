import { UserMemoryType } from '@/generated/types/user-memory';
import * as z from 'zod';

export const GetOneUserMemoryParams = z.object({
  userId: z.string(),
  type: z.nativeEnum(UserMemoryType),
});
export type GetOneUserMemoryParams = z.infer<typeof GetOneUserMemoryParams>;

export const CreateOneUserMemoryBody = GetOneUserMemoryParams;
export type CreateOneUserMemoryBody = z.infer<typeof CreateOneUserMemoryBody>;
