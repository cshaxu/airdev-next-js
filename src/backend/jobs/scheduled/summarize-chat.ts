import { ChatEntity } from '@/backend/entities/chat';
import ChatService from '@/backend/services/data/chat';
import {
  SystemScheduledJobResult,
  SystemScheduledJobStatus,
} from '@/common/types/data/system-scheduled-job';
import { Context } from '@/framework/context';
import { buildMissingErrorMessage } from '@airent/api';

export const event = 'summarize-chat';

export type Params = { chatId: string };

export async function executor(
  params: Params,
  context: Context
): Promise<SystemScheduledJobResult> {
  const chat = await ChatEntity.findUnique(
    { where: { id: params.chatId } },
    context
  );
  if (chat === null) {
    return {
      status: SystemScheduledJobStatus.FAILED,
      result: buildMissingErrorMessage(`Chat ${params.chatId}`),
    };
  }
  await ChatService.summarizeOne(chat, context);
  return {
    status: SystemScheduledJobStatus.COMPLETED,
    result: `Chat ${params.chatId} summarized`,
  };
}
