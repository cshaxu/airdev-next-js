import { PresignedPost } from '@aws-sdk/s3-presigned-post';
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

export const CreateS3PresignedPostBody = z.object({ key: z.string() });
export type CreateS3PresignedPostBody = z.infer<
  typeof CreateS3PresignedPostBody
>;
export type CreateS3PresignedPostResponse = PresignedPost;

export const CreateS3PresignedUrlBody = z.object({
  key: z.string(),
  fileName: z.string(),
  isPreview: z.boolean(),
  fileMimeType: z.string().optional(),
});
export type CreateS3PresignedUrlBody = z.infer<typeof CreateS3PresignedUrlBody>;
export type CreateS3PresignedUrlResponse = { url: string };
