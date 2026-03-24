import { DispatcherOptions } from '../../framework/callbacks';
import { Context } from '../../framework/context';
import { DispatcherConfig } from '@airent/api';
import * as z from 'zod';
export declare const handleBackendAnyAnyWith: <PARSED, RESULT, ERROR>(config: Pick<DispatcherConfig<DispatcherOptions, Context, Request, PARSED, RESULT, ERROR>, "parser" | "executor" | "options">) => import("@airent/api-next").Handler;
export declare const handleBackendJsonAnyWith: <BODY_ZOD extends z.ZodTypeAny, RESULT, ERROR>(config: Pick<DispatcherConfig<DispatcherOptions, Context, Request, z.infer<BODY_ZOD>, RESULT, ERROR>, "executor" | "options"> & {
    bodyZod: BODY_ZOD;
}) => import("@airent/api-next").Handler;
export declare const handleBackendAnyJsonWith: <PARSED, RESULT, ERROR>(config: Pick<DispatcherConfig<DispatcherOptions, Context, Request, PARSED, RESULT, ERROR>, "parser" | "executor" | "options">) => import("@airent/api-next").Handler;
export declare const handleBackendJsonJsonWith: <BODY_ZOD extends z.ZodTypeAny, RESULT, ERROR>(config: Pick<DispatcherConfig<DispatcherOptions, Context, Request, z.infer<BODY_ZOD>, RESULT, ERROR>, "executor" | "options"> & {
    bodyZod: BODY_ZOD;
}) => import("@airent/api-next").Handler;
