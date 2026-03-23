import { NextPageResponse } from '@airdev/next/frontend/types/props';
import { NextSearchParams } from '@airent/api-next';
import { Awaitable } from 'airent';
import { Metadata } from 'next';
export declare function generatePageMetadata(_path: string, _searchParams?: NextSearchParams, defaultTitle?: string): Promise<Metadata>;
export declare function pageTitle(title?: string, showProduction?: boolean): string;
export declare function withError<FN extends (...args: any[]) => Awaitable<NextPageResponse>>(fn: FN, onError?: (error: any) => NextPageResponse): (...args: Parameters<FN>) => Promise<NextPageResponse>;
//# sourceMappingURL=page.d.ts.map