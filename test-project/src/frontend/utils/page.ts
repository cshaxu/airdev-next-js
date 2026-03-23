import {
  APP_NAME,
  IS_SERVICE_PRODUCTION,
  SERVICE_TITLE_PREFIX,
} from '@/common/config';
import { logError } from '@/framework/logging';
import { NextPageResponse } from '@/frontend/types/props';
import { NextSearchParams } from '@airent/api-next';
import { Awaitable } from 'airent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generatePageMetadata(
  _path: string,
  _searchParams: NextSearchParams = {},
  defaultTitle: string = APP_NAME
): Promise<Metadata> {
  return generateDefaultMetadata(defaultTitle);
}

function generateDefaultMetadata(defaultTitle: string): Metadata {
  return { title: pageTitle(defaultTitle) };
}

export function pageTitle(title?: string, showProduction?: boolean): string {
  const prefix = `${!IS_SERVICE_PRODUCTION || showProduction ? `[${SERVICE_TITLE_PREFIX}] ` : ''}`;
  const name = title?.length ? `${title} | ${APP_NAME}` : APP_NAME;
  return `${prefix}${name}`;
}

export function withError<
  FN extends (...args: any[]) => Awaitable<NextPageResponse>,
>(fn: FN, onError?: (error: any) => NextPageResponse) {
  return async (...args: Parameters<FN>) => {
    try {
      return await fn(...args);
    } catch (error: any) {
      if (error.message === 'NEXT_REDIRECT') {
        throw error;
      }
      logError(error);
      if (onError) {
        return onError(error);
      } else if (error.status === 404) {
        return notFound();
      } else {
        throw error;
      }
    }
  };
}
