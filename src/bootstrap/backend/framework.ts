import type { FrameworkAdapter } from '@airdev/next/adapter/backend/framework';
import * as AirentApi from '@airent/api';
import createHttpError from 'http-errors';
import { ZodError } from 'zod';

export const bootstrapFrameworkAdapter: FrameworkAdapter = {
  logError(error, context) {
    const normalizedError = normalizeBootstrapError(error);
    AirentApi.logError(normalizedError, context, 1);
  },
  normalizeError: normalizeBootstrapError,
};

function normalizeBootstrapError(error: any): AirentApi.NormalizedError {
  return {
    ...normalizeBootstrapErrorInternal(error),
    stack:
      !!error && 'stack' in error && typeof error.stack === 'string'
        ? error.stack.split('\n')
        : [],
    original: error,
  };
}

function normalizeBootstrapErrorInternal(
  error: any
): Pick<AirentApi.NormalizedError, 'message' | 'name' | 'status'> {
  if (error instanceof createHttpError.HttpError) {
    return {
      name: error.name,
      status: error.status,
      message: error.message,
    };
  }
  if (error instanceof ZodError) {
    const httpError = createHttpError.BadRequest();
    return {
      name: httpError.name,
      status: httpError.status,
      message: error.issues
        .map(
          (issue) =>
            `${issue.message ? `${issue.message}: ` : ''}${issue.code} on [${issue.path.join(', ')}]`
        )
        .join('; '),
    };
  }
  const httpError = createHttpError.InternalServerError();
  return {
    name: httpError.name,
    status: httpError.status,
    message: !!error && 'message' in error ? error.message : httpError.name,
  };
}
