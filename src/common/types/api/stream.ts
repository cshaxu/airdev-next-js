import { ChatMessageAttachment } from '@/common/types/data/chat-message';
import * as z from 'zod';

export const GetBotMessageStreamBody = z.object({
  chatId: z.string(),
  prompt: z.string().default(''),
  userChatMessageId: z.string().optional(),
  userChatMessageAttachments: z.array(ChatMessageAttachment).optional(),
  botChatMessageId: z.string(),
});
export type GetBotMessageStreamBody = z.infer<typeof GetBotMessageStreamBody>;

export const GetEmailDraftStreamBody = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});
export type GetEmailDraftStreamBody = z.infer<typeof GetEmailDraftStreamBody>;

export const GetGenericStreamBody = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});
export type GetGenericStreamBody = z.infer<typeof GetGenericStreamBody>;
