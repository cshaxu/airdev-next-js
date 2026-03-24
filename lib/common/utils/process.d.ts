import { Awaitable } from 'airent';
export declare function retry<T>(fn: () => Awaitable<T>, retries: number, delay: number): Promise<T>;
export declare function safe<T>(fn: () => Awaitable<T>, fallback: T): Promise<T>;
export declare function retrySafe<T>(fn: () => Awaitable<T>, retries: number, delay: number, fallback: T): Promise<T>;
