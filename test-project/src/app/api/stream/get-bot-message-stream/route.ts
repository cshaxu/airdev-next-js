import { handleBackendJsonAnyWith } from '@/backend/lib/handlers';
import { getBotMessageStream as executor } from '@/backend/services/ai/message';
import { GetBotMessageStreamBody as bodyZod } from '@/common/types/api/stream';

export const POST = async (request: Request) => {
  return await handleBackendJsonAnyWith({ bodyZod, executor })(request);
};
