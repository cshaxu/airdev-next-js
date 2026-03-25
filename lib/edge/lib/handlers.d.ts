import { DispatcherOptions } from '@airdev/next/framework/callbacks';
import { Context } from '@airdev/next/framework/context';
import { DispatcherConfig } from '@airent/api';
export declare const handleEdgeWith: <PARSED, RESULT, ERROR>(config: Pick<DispatcherConfig<DispatcherOptions, Context, Request, PARSED, RESULT, ERROR>, "parser" | "executor" | "executorWrapper" | "options">) => import("@airent/api-next").Handler;
