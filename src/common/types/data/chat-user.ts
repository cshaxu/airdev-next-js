// library imports
import * as z from 'zod';

// query

export const GetManyChatUsersQuery = z.object({
  userId: z.string(),
  createdAtBefore: z.coerce.date().optional(),
  take: z.number().min(1).optional(),
});
export type GetManyChatUsersQuery = z.infer<typeof GetManyChatUsersQuery>;
