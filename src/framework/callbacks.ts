import { frameworkAdapter } from '@airdev/next/adapter/backend/framework';
import { privateConfig } from '@airdev/next/backend/config';
import {
  HEADER_INTERNAL_SECRET_KEY,
  publicConfig,
} from '@airdev/next/common/config';
import {
  CommonResponse,
  DispatcherConfig,
  DispatcherContext,
  NormalizedError,
  Parser,
  buildInvalidErrorMessage,
} from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
import createHttpError from 'http-errors';
import { ZodError } from 'zod';
import { Context } from './context';
const HEADER_AUTHORIZATION_KEY = 'authorization';

export type DispatcherOptions = {
  requireLogin?: boolean;
  requireAdmin?: boolean;
  requireInternal?: boolean;
  requireCron?: boolean;
  cacheRequest?: boolean;
};

export const commonDispatcherConfig: Pick<
  DispatcherConfig<DispatcherOptions, Context, any, any, any, any>,
  'authorizer' | 'parserWrapper' | 'errorHandler'
> = { authorizer, parserWrapper, errorHandler };

export const commonHandlerConfig: Pick<
  HandlerConfig<Context, any, any, any, any>,
  'requestParser' | 'errorHandler'
> = { requestParser, errorHandler };

function requestParser(request: Request): Request {
  return request;
}

function authorizer(context: Context, options?: DispatcherOptions): void {
  // require cron
  if (options?.requireCron === true) {
    if (
      context.headers.get(HEADER_AUTHORIZATION_KEY) ===
      `Bearer ${privateConfig.cronSecret ?? ''}`
    ) {
      return;
    }
    throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
  }

  // require internal
  if (options?.requireInternal === true) {
    if (
      context.headers.get(HEADER_INTERNAL_SECRET_KEY) ===
      (privateConfig.internalSecret ?? '')
    ) {
      return;
    }
    throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
  }

  // require admin
  if (options?.requireAdmin === true) {
    if (context.currentUser?.isAdmin) {
      return;
    }
    throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
  }

  // require login by default, unless explicitly set to false or require others
  if (options?.requireLogin !== false) {
    if (context.currentUser) {
      return;
    }
    throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
  }
}

function parserWrapper<DATA, PARSED>(
  parser: Parser<Context, DATA, PARSED>
): Parser<Context, DATA, PARSED> {
  return async (request: DATA, context: Context) => {
    try {
      return await parser(request, context);
    } catch (error: any) {
      if (
        error instanceof createHttpError.HttpError ||
        error instanceof ZodError
      ) {
        throw error;
      } else {
        throw createHttpError.BadRequest(error.message);
      }
    }
  };
}

function errorHandler<DATA, PARSED, RESULT>(
  error: any,
  dc: DispatcherContext<Context, DATA, PARSED, RESULT>
): CommonResponse<RESULT, NormalizedError> {
  const { context, ...dcRest } = dc;
  const { headers, ...rcRest } = context ?? {};
  const redactedDc = {
    ...rcRest,
    selectedHeaders: selectHeaders(headers),
    ...dcRest,
    redactedHeaders: redactHeaders(headers),
  };
  const normalizedError = frameworkAdapter.normalizeError(error);
  frameworkAdapter.logError(normalizedError, redactedDc);
  if (publicConfig.service.environment === 'production') {
    delete normalizedError['original'];
    delete normalizedError['stack'];
  }
  return { code: normalizedError.status, error: normalizedError };
}

const selectedHeaderKeys = ['referer', 'user-agent'];

const selectHeaders = (headers?: Headers) =>
  headers === undefined
    ? {}
    : Array.from(headers.entries())
        .filter(([key, _]) => selectedHeaderKeys.includes(key))
        .reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, any>
        );

const excludedHeaderKeys = [
  ...selectedHeaderKeys,
  'cookie',
  'X-INTERNAL-SECRET',
];

const redactHeaders = (headers?: Headers) =>
  headers === undefined
    ? {}
    : Array.from(headers.entries())
        .filter(([key, _]) => !excludedHeaderKeys.includes(key))
        .reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, any>
        );
