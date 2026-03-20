import { generateGenericStream } from '@/backend/ai/generic-stream-generator';
import { mockStreamText } from '@/backend/sdks/ai';
import { GetGenericStreamBody } from '@/common/types/api/stream';
import { adminOrThrow, Context } from '@/framework/context';
import { logInfo } from '@airent/api';

export async function getGenericStream(
  body: GetGenericStreamBody,
  context: Context
): Promise<Response> {
  const { prompt } = body;

  if (!prompt?.trim()) {
    return mockStreamText('Please enter a valid email prompt.', async () => {});
  }

  if (!context.currentUser) {
    adminOrThrow(context);
  }

  const onStreamDone = async (event: { text: string }) => {
    logInfo({ text: event.text });
  };

  return generateGenericStream(prompt, onStreamDone, context);
}
