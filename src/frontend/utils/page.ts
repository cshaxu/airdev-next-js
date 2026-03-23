import { frameworkAdapter } from '@airdev/next/adapter/backend/framework';
import { publicConfig } from '@airdev/next/common/config';
import { NextPageResponse } from '@airdev/next/frontend/types/props';
import { NextSearchParams } from '@airent/api-next';
import { Awaitable } from 'airent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generatePageMetadata(
  _path: string,
  _searchParams: NextSearchParams = {},
  defaultTitle: string = publicConfig.app.name
): Promise<Metadata> {
  return generateDefaultMetadata(defaultTitle);
}

function generateDefaultMetadata(defaultTitle: string): Metadata {
  return { title: pageTitle(defaultTitle) };
}

export function pageTitle(title?: string, showProduction?: boolean): string {
  const { app, service } = publicConfig;
  const prefix = `${service.environment !== 'production' || showProduction ? `[${service.titlePrefix}] ` : ''}`;
  const name = title?.length ? `${title} | ${app.name}` : app.name;
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
      frameworkAdapter.logError(error);
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
