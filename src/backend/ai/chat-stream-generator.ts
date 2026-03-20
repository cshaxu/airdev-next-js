import { ChatEntity } from '@/backend/entities/chat';
import { streamText } from '@/backend/sdks/ai';
import ChatMessageService from '@/backend/services/data/chat-message';
import { Context } from '@/framework/context';
import { ModelMessage, StreamTextOnFinishCallback } from 'ai';

function buildPrompt(isFirstMessage: boolean): string {
  const baseGuidelines = [
    '1. Answer questions directly and concisely',
    '2. Only mention details if directly relevant to the answer',
    '3. Be professional and to the point',
    '4. Keep responses very concise and helpful',
    '5. Use bullet points and lists if appropriate.',
  ];

  // Client User Prompt
  return [
    'You are a friendly assistant helping a user with their questions.',
    '',
    'General guidelines for your responses:',
    ...baseGuidelines,
    '',
    ...(isFirstMessage
      ? ['Initial Response Guidelines:', '1. Ask what specific help they need']
      : [
          'Follow up Response Guidelines:',
          '1. Answer their question directly first',
          '2. Explain next steps or recommendations clearly',
          '3. Be supportive and encouraging',
        ]),
    '',
    'Remember:',
    '- Use simple language to explain complex concepts',
    '- Be patient and supportive',
    '- Be very concise, less than 50 words',
  ].join('\n');
}

export async function generateChatStream(
  chat: ChatEntity,
  onFinish: StreamTextOnFinishCallback<{}>,
  context: Context
): Promise<Response> {
  const { summary, summarizedAt } = chat;
  const previousChatMessages = await ChatMessageService.getMany(
    {
      chatId: chat.id,
      ...(summarizedAt && { createdAtBefore: summarizedAt }),
    },
    context
  );
  const isFirstMessage = summary === null && previousChatMessages.length === 0;

  const system = buildPrompt(isFirstMessage);

  // build list of outbound messages for llm
  const messages: ModelMessage[] = previousChatMessages
    .map((m) => ({
      role: m.userId === null ? ('assistant' as const) : ('user' as const),
      content: m.content.text ?? '',
    }))
    .filter((m) => m.content.length)
    .reverse();

  if (summary?.length) {
    messages.unshift({ role: 'assistant', content: summary });
  }

  return streamText({ system, messages, onFinish, maxTokens: 500 });
}
