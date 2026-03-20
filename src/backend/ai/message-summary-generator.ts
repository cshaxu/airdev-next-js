import { OPENAI_CHAT_MODEL } from '@/backend/config';
import { ChatMessageEntity } from '@/backend/entities/chat-message';
import { generateText } from '@/backend/sdks/ai';
import { countTokens } from '@/backend/utils/tiktoken';
import { ModelMessage } from 'ai';
import { TiktokenModel } from 'js-tiktoken';

// recent message: 5000 max
// last summary: 500 max
// system message: 500 max
// new summary: 500 max
// total: 6500 max
const RECENT_MESSAGE_MIN_TOKEN_COUNT = 5000;
const MAX_TOKENS = 500;

const SYSTEM_PROMPT =
  'Review the chat history between the user and the assistant. Please ' +
  'summarize the chat history into a short paragraph. Your response must ' +
  'start with "This conversation is about".';

export async function generateMessageSummary(
  lastSummary: string | null,
  chatMessages: ChatMessageEntity[]
): Promise<string> {
  // build chat messages
  const messages: ModelMessage[] = chatMessages
    .filter((m) => m.getText()?.length)
    .map((m) => ({
      role: m.userId === null ? 'assistant' : 'user',
      content: m.getText()!,
    }));

  // verify necessity 1
  if (messages.length < 1) {
    return '';
  }

  if (lastSummary !== null) {
    messages.unshift({ role: 'assistant', content: lastSummary });
  }

  // verify necessity 2
  const model = OPENAI_CHAT_MODEL as TiktokenModel;
  const string = JSON.stringify(messages);
  const tokenCount = countTokens(model, [string])[0];
  if (tokenCount < RECENT_MESSAGE_MIN_TOKEN_COUNT) {
    return '';
  }

  // generate message summary
  const options = {
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: MAX_TOKENS,
  };
  return await generateText(options);
}
