import { DispatcherConfig } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
import { Context } from './context';
export type DispatcherOptions = {
    requireLogin?: boolean;
    requireAdmin?: boolean;
    requireInternal?: boolean;
    requireCron?: boolean;
    cacheRequest?: boolean;
};
export declare const commonDispatcherConfig: Pick<DispatcherConfig<DispatcherOptions, Context, any, any, any, any>, 'authorizer' | 'parserWrapper' | 'errorHandler'>;
export declare const commonHandlerConfig: Pick<HandlerConfig<Context, any, any, any, any>, 'requestParser' | 'errorHandler'>;
//# sourceMappingURL=callbacks.d.ts.map