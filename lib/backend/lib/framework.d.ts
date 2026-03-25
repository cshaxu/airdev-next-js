import { DispatcherOptions } from '../../framework/callbacks.js';
import { Context, ContextUser } from '../../framework/context.js';
import { DispatcherConfig } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
export declare const dispatcherConfig: Pick<DispatcherConfig<DispatcherOptions, Context, any, any, any, any>, 'authorizer' | 'parserWrapper' | 'executorWrapper' | 'errorHandler'>;
export declare const handlerConfig: HandlerConfig<Context, any, any, any, any>;
export declare function getRealCurrentUser(): Promise<ContextUser | null>;
