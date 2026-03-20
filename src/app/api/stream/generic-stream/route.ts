import { handleBackendJsonAnyWith } from '@/backend/lib/handlers';
import { getGenericStream as executor } from '@/backend/services/ai/generic-stream';
import { GetGenericStreamBody as bodyZod } from '@/common/types/api/stream';

export const POST = async (request: Request) => {
  return await handleBackendJsonAnyWith({ bodyZod, executor })(request);
};
