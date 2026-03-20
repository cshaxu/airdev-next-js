import {
  AWS_ACCESS_KEY_ID,
  AWS_S3_REGION,
  AWS_SECRET_ACCESS_KEY,
} from '@/backend/config';
import { AWS_S3_BUCKET, IS_DATA_LOCAL } from '@/common/config';
import { logInfo, wait } from '@airent/api';
import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  HeadObjectCommand,
  HeadObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  GetDocumentTextDetectionCommand,
  GetDocumentTextDetectionCommandOutput,
  StartDocumentTextDetectionCommand,
  StartDocumentTextDetectionCommandOutput,
  TextractClient,
} from '@aws-sdk/client-textract';
import { PresignedPost, createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { Conditions } from '@aws-sdk/s3-presigned-post/dist-types/types';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import createHttpError from 'http-errors';

const AWS_CLIENT_CONFIG = {
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
};

const LOCAL_AWS_BASE_URL = 'http://localhost:3333';
const LOCAL_AWS_S3_BASE_URL = `${LOCAL_AWS_BASE_URL}/s3`;
const LOCAL_AWS_TEXTRACT_BASE_URL = `${LOCAL_AWS_BASE_URL}/textract`;

export async function getS3Object(
  key: string
): Promise<GetObjectCommandOutput> {
  const payload = { Bucket: AWS_S3_BUCKET, Key: key };
  if (IS_DATA_LOCAL) {
    return await fetch(`${LOCAL_AWS_S3_BASE_URL}/get-object`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
  const s3Client = new S3Client(AWS_CLIENT_CONFIG);
  const command = new GetObjectCommand(payload);
  return await s3Client.send(command);
}

export async function headS3Object(
  key: string
): Promise<HeadObjectCommandOutput> {
  const payload = { Bucket: AWS_S3_BUCKET, Key: key };
  if (IS_DATA_LOCAL) {
    return await fetch(`${LOCAL_AWS_S3_BASE_URL}/head-object`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  }
  const s3Client = new S3Client(AWS_CLIENT_CONFIG);
  const command = new HeadObjectCommand(payload);
  return await s3Client.send(command);
}

export async function getS3ObjectBytes(
  key: string,
  maxBytes: number = 8192
): Promise<Buffer> {
  const payload = { Bucket: AWS_S3_BUCKET, Key: key };
  if (IS_DATA_LOCAL) {
    const response = await fetch(`${LOCAL_AWS_S3_BASE_URL}/get-object-bytes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, MaxBytes: maxBytes }),
    });
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
  const s3Client = new S3Client(AWS_CLIENT_CONFIG);
  const command = new GetObjectCommand({
    ...payload,
    Range: `bytes=0-${maxBytes - 1}`,
  });
  const response = await s3Client.send(command);

  if (!response.Body) {
    return Buffer.alloc(0);
  }

  const chunks: Buffer[] = [];
  for await (const chunk of response.Body as NodeJS.ReadableStream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function uploadS3Object(
  key: string,
  file: File
): Promise<PutObjectCommandOutput> {
  if (IS_DATA_LOCAL) {
    const formData = new FormData();
    formData.append('Bucket', AWS_S3_BUCKET);
    formData.append('Key', key);
    formData.append('file', file);
    return await fetch(`${LOCAL_AWS_S3_BASE_URL}/put-object`, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  } else {
    const s3Client = new S3Client(AWS_CLIENT_CONFIG);
    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: file,
    });
    return await s3Client.send(command);
  }
}

export async function deleteS3Object(
  key: string
): Promise<DeleteObjectCommandOutput> {
  const payload = { Bucket: AWS_S3_BUCKET, Key: key };
  if (IS_DATA_LOCAL) {
    return await fetch(`${LOCAL_AWS_S3_BASE_URL}/delete-object`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  } else {
    const s3Client = new S3Client(AWS_CLIENT_CONFIG);
    const deleteCommand = new DeleteObjectCommand(payload);
    return await s3Client.send(deleteCommand);
  }
}

export async function createS3PresignedPost(
  key: string,
  expiresInSeconds: number = 15 * 60 // 15 minutes
): Promise<PresignedPost> {
  const payload = { Bucket: AWS_S3_BUCKET, Key: key };
  if (IS_DATA_LOCAL) {
    return await fetch(`${LOCAL_AWS_S3_BASE_URL}/create-presigned-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  } else {
    const s3Client = new S3Client(AWS_CLIENT_CONFIG);
    const options = {
      ...payload,
      Fields: { key },
      Conditions: [
        // ['starts-with', '$Content-Type', 'image/'],
        ['content-length-range', 0, 100_000_000] as Conditions,
      ],
      Expires: expiresInSeconds,
    };
    return await createPresignedPost(s3Client, options);
  }
}

export async function createS3PresignedUrl(
  key: string,
  fileName: string,
  isPreview: boolean,
  fileMimeType: string | undefined,
  expiresInSeconds: number = 15 * 60
): Promise<string> {
  const payload = { Bucket: AWS_S3_BUCKET, Key: key };
  if (IS_DATA_LOCAL) {
    return await fetch(`${LOCAL_AWS_S3_BASE_URL}/create-presigned-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => res.text());
  } else {
    const s3Client = new S3Client(AWS_CLIENT_CONFIG);
    const ResponseContentDisposition = `${isPreview ? 'inline' : 'attachment'}; filename="${fileName}"`;
    const options = {
      ...payload,
      ResponseContentDisposition,
      ...(fileMimeType !== undefined && { ResponseContentType: fileMimeType }),
    };
    const command = new GetObjectCommand(options);
    return await getSignedUrl(s3Client, command, {
      expiresIn: expiresInSeconds,
    });
  }
}

export async function startDocumentTextDetection(
  key: string
): Promise<StartDocumentTextDetectionCommandOutput> {
  const payload = {
    DocumentLocation: { S3Object: { Bucket: AWS_S3_BUCKET, Name: key } },
  };
  if (IS_DATA_LOCAL) {
    return await fetch(
      `${LOCAL_AWS_TEXTRACT_BASE_URL}/start-document-text-detection`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    ).then((res) => res.json());
  }
  const client = new TextractClient(AWS_CLIENT_CONFIG);
  const command = new StartDocumentTextDetectionCommand(payload);
  return await client.send(command);
}

export async function getDocumentTextDetection(
  jobId: string,
  nextToken?: string
): Promise<GetDocumentTextDetectionCommandOutput> {
  const payload = { JobId: jobId, NextToken: nextToken };
  if (IS_DATA_LOCAL) {
    return await fetch(
      `${LOCAL_AWS_TEXTRACT_BASE_URL}/get-document-text-detection`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    ).then((res) => res.json());
  }
  const client = new TextractClient(AWS_CLIENT_CONFIG);
  return await client.send(new GetDocumentTextDetectionCommand(payload));
}

export async function getDocumentTextDetectionLoop(
  callback: (response: GetDocumentTextDetectionCommandOutput) => Promise<void>,
  jobId: string,
  nextToken?: string,
  maxDurationSeconds: number = 300
): Promise<boolean> {
  const startTime = new Date();

  let waitSeconds = 1;
  let jobStatus = 'SUCCEEDED';

  do {
    const durationSeconds = new Date().getTime() - startTime.getTime();
    const isExpired = durationSeconds > maxDurationSeconds * 1000;
    if (isExpired) {
      return false;
    }
    const response = await getDocumentTextDetection(jobId, nextToken);

    const { JobStatus, NextToken } = response;

    switch (JobStatus) {
      case 'IN_PROGRESS':
        jobStatus = 'IN_PROGRESS';
        waitSeconds = Math.min(10, waitSeconds * 2);
        logInfo(
          `Textract job "${jobId}" is in progress, waiting ${waitSeconds} seconds`
        );
        await wait(waitSeconds * 1000);
        break;
      case 'SUCCEEDED':
        jobStatus = 'SUCCEEDED';
        waitSeconds = 1;
        nextToken = NextToken;
        await callback(response);
        break;
      case 'FAILED':
        jobStatus = 'FAILED';
        throw createHttpError.InternalServerError(
          `Textract job "${jobId}" failed`
        );
    }
  } while (nextToken || jobStatus === 'IN_PROGRESS');

  return true;
}
