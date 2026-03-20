import { DEFAULT_TAKE } from '@/common/utils/zod';
import { buildMissingErrorMessage } from '@airent/api';
import * as z from 'zod';

// structs

export type UserEmailPayload = { name: string; imageUrl: string };

// query

export const GetManyUsersQuery = z.object({
  q: z.string().optional(),
});
export type GetManyUsersQuery = z.infer<typeof GetManyUsersQuery>;

export const SearchUsersQuery = z.object({
  // keys
  q: z.string(),
  // cursors
  take: DEFAULT_TAKE,
});
export type SearchUsersQuery = z.infer<typeof SearchUsersQuery>;

// params

export const GetOneUserParams = z.object({ id: z.string() });
export type GetOneUserParams = z.infer<typeof GetOneUserParams>;

export const UpdateOneUserBody = z
  .object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    emailCode: z.string().length(5).optional(),
    imageUrl: z.string().optional(),
  })
  .refine(
    (data) =>
      // if email is provided, the corresponding verofication code
      // must also be provided
      (data.email === undefined) === (data.emailCode === undefined),
    buildMissingErrorMessage(['emailCode'])
  );
export type UpdateOneUserBody = z.infer<typeof UpdateOneUserBody>;
