import * as z from 'zod';

export enum ChatMessageAttachmentType {
  FILE = 'FILE',
  SUGGESTED_ANSWER = 'SUGGESTED_ANSWER',
}

// queries

export const GetManyChatMessagesQuery = z.object({
  chatId: z.string(),
  createdAtBefore: z.coerce.date().optional(),
  take: z.number().min(1).optional(),
});
export type GetManyChatMessagesQuery = z.infer<typeof GetManyChatMessagesQuery>;

export const GetOneChatMessageParams = z.object({ id: z.string() });
export type GetOneChatMessageParams = z.infer<typeof GetOneChatMessageParams>;

// bodies

export const ChatMessageAttachmentFile = z.object({
  type: z.literal(ChatMessageAttachmentType.FILE),
  id: z.string(),
  originalName: z.string(),
});
export type ChatMessageAttachmentFile = z.infer<
  typeof ChatMessageAttachmentFile
>;

export const ChatMessageAttachmentSuggestedAnswer = z.object({
  type: z.literal(ChatMessageAttachmentType.SUGGESTED_ANSWER),
  index: z.number().min(0),
  text: z.string(),
});
export type ChatMessageAttachmentSuggestedAnswer = z.infer<
  typeof ChatMessageAttachmentSuggestedAnswer
>;

export const ChatMessageAttachment = z.union([
  ChatMessageAttachmentFile,
  ChatMessageAttachmentSuggestedAnswer,
]);
export type ChatMessageAttachment = z.infer<typeof ChatMessageAttachment>;

export const CreateOneChatMessageBody = z.object({
  id: z.string(),
  // chatId: z.string(), // this is an internal body
  userId: z.string(),
  text: z.string().min(1),
  attachments: z.array(ChatMessageAttachment).optional(),
});
export type CreateOneChatMessageBody = Omit<
  z.infer<typeof CreateOneChatMessageBody>,
  'userId'
> & { userId: string | null };

export type ChatMessageContent = { text?: string };
