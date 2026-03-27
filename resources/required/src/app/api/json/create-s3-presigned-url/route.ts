import * as AwsSdk from '@/backend/sdks/aws';
import { CreateS3PresignedUrlBody } from '@/common/types/api/json';
import { handleBackendJsonJsonWith } from '@airdev/next/backend/lib/handlers';

const executor = (body: CreateS3PresignedUrlBody) =>
  AwsSdk.createS3PresignedUrl(
    body.key,
    body.fileName,
    body.isPreview,
    body.fileMimeType
  ).then((url) => ({ url }));

export const POST = handleBackendJsonJsonWith({
  bodyZod: CreateS3PresignedUrlBody,
  executor,
});
