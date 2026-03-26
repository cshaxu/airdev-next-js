import { commonFunctionConfig } from '@/config/function/common';
import { publicConfig } from '@/config/json/public';
import { NextPageResponse } from '@/frontend/types/props';
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
  const prefix = `${publicConfig.service.serviceEnvironment !== 'production' || showProduction ? `[${publicConfig.service.titlePrefix}] ` : ''}`;
  const name = title?.length
    ? `${title} | ${publicConfig.app.name}`
    : publicConfig.app.name;
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
      commonFunctionConfig.logError(error);
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
