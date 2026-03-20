import { streamText } from '@/backend/sdks/ai';
import { Context } from '@/framework/context';
import { StreamTextOnFinishCallback } from 'ai';

const buildSystemPrompt = (input: string) => {
  return [
    'Write a clear, professional, and concise response based on the requirements below.',
    '',
    `=== REQUIREMENTS BEGIN ===`,
    input,
    `=== REQUIREMENTS END ===`,
    '',
    'Do not include any explanations or other unnecessary text as your response',
    'will be displayed directly. Focus on what is asked for in the requirements.',
  ].join('\n');
};

export async function generateGenericStream(
  prompt: string,
  onFinish: StreamTextOnFinishCallback<{}>,
  _context: Context
): Promise<Response> {
  const system = buildSystemPrompt(prompt);

  return streamText({
    system,
    messages: [{ role: 'user', content: prompt }],
    onFinish,
    maxTokens: 400,
  });
}
