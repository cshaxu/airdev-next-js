import * as z from 'zod';

// params

export const GetOneNextauthVerificationTokenParams = z.object({
  email: z.string().email(),
  code: z.string(),
});
export type GetOneNextauthVerificationTokenParams = z.infer<
  typeof GetOneNextauthVerificationTokenParams
>;

// body

export const CreateOneNextauthVerificationTokenBody = z.object({
  email: z.string().email(),
});
export type CreateOneNextauthVerificationTokenBody = z.infer<
  typeof CreateOneNextauthVerificationTokenBody
>;
