import { DispatcherOptions } from '@airdev/next/framework/callbacks';
import { Context, ContextUser } from '@airdev/next/framework/context';
import { DispatcherConfig } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
export { mockContext } from '@airdev/next/framework/context';
export declare const dispatcherConfig: Pick<DispatcherConfig<DispatcherOptions, Context, any, any, any, any>, 'authorizer' | 'parserWrapper' | 'executorWrapper' | 'errorHandler'>;
export declare const handlerConfig: HandlerConfig<Context, any, any, any, any>;
export declare function getRealCurrentUser(): Promise<ContextUser | null>;
//# sourceMappingURL=framework.d.ts.map