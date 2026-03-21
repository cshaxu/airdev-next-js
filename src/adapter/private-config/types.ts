export interface PrivateConfig {
  cronSecret: string;
  internalSecret: string;
  defaultDbBatchSize: number;
  defaultApiBatchSize: number;
  defaultPageSize: number;
  cacheRequestPathPrefixes: string[];
}
