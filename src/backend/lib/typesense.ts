import {
  DEFAULT_DB_BATCH_SIZE,
  TYPESENSE_API_KEY,
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_PROTOCOL,
} from '@/backend/config';
import { batchExecuteByPageParam } from '@/backend/utils/data';
import { Context } from '@/framework/context';
import { logError } from '@/framework/logging';
import {
  SearchEngineBase,
  SearchServiceBase,
  logInfo,
  logWarn,
} from '@airent/api';
import createHttpError from 'http-errors';
import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import {
  DocumentSchema,
  SearchParams,
} from 'typesense/lib/Typesense/Documents';
import { MultiSearchRequestsSchema } from 'typesense/lib/Typesense/MultiSearch';

type IdObject = { id: string };

export class TypesenseSearchEngine<
  DOCUMENT extends DocumentSchema,
> implements SearchEngineBase<
  DOCUMENT,
  SearchParams | MultiSearchRequestsSchema,
  CollectionCreateSchema
> {
  private nodeConfig = {
    host: TYPESENSE_HOST,
    port: TYPESENSE_PORT,
    protocol: TYPESENSE_PROTOCOL,
  };

  private clientConfig = {
    nodes: [this.nodeConfig],
    apiKey: TYPESENSE_API_KEY,
    connectionTimeoutSeconds: 60,
  };

  private client = new Typesense.Client(this.clientConfig);

  public async create(
    indexName: string,
    schema: CollectionCreateSchema
  ): Promise<boolean> {
    try {
      logInfo({ indexName, schema });
      await this.client.collections().create(schema);
      return true;
    } catch (error) {
      logError(error, { indexName, schema });
      return false;
    }
  }

  public async delete(indexName: string): Promise<boolean> {
    try {
      logInfo({ indexName });
      await this.client.collections(indexName).delete();
      return true;
    } catch (error) {
      logError(error, { indexName });
      return false;
    }
  }

  private async alias(
    indexName: string,
    aliasIndexName: string
  ): Promise<boolean> {
    try {
      logInfo({ indexName, aliasIndexName });
      await this.client
        .aliases()
        .upsert(aliasIndexName, { collection_name: indexName });
      return true;
    } catch (error) {
      logError(error, { indexName, aliasIndexName });
      return false;
    }
  }

  private async unalias(aliasIndexName: string): Promise<string | null> {
    try {
      logInfo({ aliasIndexName });
      const { collection_name } = await this.client
        .aliases(aliasIndexName)
        .delete();
      return collection_name;
    } catch (error) {
      logError(error, { aliasIndexName });
      return null;
    }
  }

  public async reset(
    indexName: string,
    schema: CollectionCreateSchema,
    indexer: () => Promise<boolean>
  ): Promise<boolean> {
    const newIndexName = `${indexName}-${Date.now()}`;
    const newIndexSchema = { ...schema, name: newIndexName };
    await this.create(newIndexName, newIndexSchema);

    const isIndexed = await indexer();
    if (!isIndexed) {
      logWarn({ message: 'unable to index' });
      return false;
    }

    const oldIndexName = await this.unalias(indexName);
    await this.alias(newIndexName, indexName);

    if (oldIndexName !== null) {
      await this.delete(oldIndexName);
    }

    return true;
  }

  public async index(
    indexName: string,
    documents: DOCUMENT[]
  ): Promise<boolean[]> {
    const { length } = documents;
    if (length === 0) {
      return [];
    }
    const logProps = { indexName, count: length };
    try {
      logInfo(logProps);
      if (length === 1) {
        await this.client
          .collections(indexName)
          .documents()
          .upsert(documents[0]);
        return [true];
      }
      return await this.client
        .collections<DOCUMENT>(indexName)
        .documents()
        .import(documents, { action: 'upsert' })
        .then((a) => a.map((one) => one.success));
    } catch (error) {
      logError(error, logProps);
      return Array.from({ length }, () => false);
    }
  }

  public async unindex(
    _indexName: string,
    _documents: DOCUMENT[]
  ): Promise<boolean[]> {
    throw createHttpError.NotImplemented();
  }

  public async retrieve(
    indexName: string,
    query: SearchParams | MultiSearchRequestsSchema
  ): Promise<DOCUMENT[]> {
    const logProps = { indexName, query };
    try {
      let hits = [];
      if ('searches' in query) {
        hits = await this.client.multiSearch
          .perform<DOCUMENT[]>(query)
          .then((r) => r.results.flatMap((result) => result.hits ?? []));
      } else {
        hits = await this.client
          .collections<DOCUMENT>(indexName)
          .documents()
          .search(query)
          .then((r) => r.hits ?? []);
      }
      return hits.map((hit) => hit.document);
    } catch (error) {
      logError(error, logProps);
      return [];
    }
  }
}

export abstract class TypesenseSearchService<
  ENTITY extends IdObject,
  DOCUMENT extends IdObject,
  QUERY,
  PAGE_PARAM,
> extends SearchServiceBase<
  ENTITY,
  QUERY,
  Context,
  DOCUMENT,
  SearchParams | MultiSearchRequestsSchema,
  Omit<CollectionCreateSchema, 'name'>
> {
  protected engine = new TypesenseSearchEngine<DOCUMENT>();

  protected entityKeyMapper = (one: ENTITY) => one.id;

  protected documentKeyMapper = (one: DOCUMENT) => one.id;

  protected abstract batchLoader(
    _context: Context,
    _pageParam: PAGE_PARAM | undefined,
    _batchSize: number
  ): Promise<ENTITY[]>;

  protected abstract batchPageParamMapper(_one: ENTITY): PAGE_PARAM;

  public indexAll = (
    context: Context,
    batchSize: number = DEFAULT_DB_BATCH_SIZE
  ) =>
    batchExecuteByPageParam<ENTITY, boolean, PAGE_PARAM>(
      (pageParam, currentBatchSize) =>
        this.batchLoader(context, pageParam, currentBatchSize),
      (many) => this.indexMany(many, context),
      (one) => this.batchPageParamMapper(one),
      batchSize
    ).then((_) => true);
}
