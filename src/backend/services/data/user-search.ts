import { UserEntity } from '@/backend/entities/user';
import { TypesenseSearchService } from '@/backend/lib/typesense';
import { SearchUsersQuery } from '@/common/types/data/user';
import { getTake } from '@/common/utils/zod';
import { Context } from '@/framework/context';
import { Prisma } from '@prisma/client';
import { CollectionFieldSchema } from 'typesense/lib/Typesense/Collection';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

export type UserSearchDocument = { id: string; name: string };

const COLLECTION_NAME = 'users';

const FIELD_ID = 'id';
const FIELD_NAME = 'name';

const FIELDS: CollectionFieldSchema[] = [
  { name: FIELD_ID, type: 'string' },
  { name: FIELD_NAME, type: 'string' },
];

export class UserSearchService extends TypesenseSearchService<
  UserEntity,
  UserSearchDocument,
  SearchUsersQuery,
  string
> {
  protected indexName = COLLECTION_NAME;

  protected indexSchema = { name: this.indexName, fields: FIELDS };

  protected dehydrate = (many: UserEntity[]) =>
    Promise.all(many.map(this.dehydrateOne));

  private async dehydrateOne(one: UserEntity): Promise<UserSearchDocument> {
    const { id, name } = one;
    return { id, name };
  }

  protected async hydrate(
    documents: UserSearchDocument[],
    context: Context
  ): Promise<UserEntity[]> {
    const ids = documents.map((one) => one.id);
    const params = { where: { id: { in: ids } } };
    return await UserEntity.findMany(params, context).then((a) =>
      a.filter((one) => one.name !== null)
    );
  }

  protected prepareQuery(query: SearchUsersQuery): SearchParams {
    const { q: qRaw } = query;

    const q = qRaw?.length ? qRaw : '*';
    const query_by = FIELD_NAME;
    const sort_by = '_text_match:desc';
    const per_page = getTake(query);

    return { q, query_by, sort_by, per_page };
  }

  protected batchPageParamMapper(one: UserEntity): string {
    return one.id;
  }

  protected async batchLoader(
    context: Context,
    pageParam: string | undefined,
    batchSize: number
  ): Promise<UserEntity[]> {
    const where = { email: { not: '' }, name: { not: '' } };
    const orderBy = { id: Prisma.SortOrder.asc };
    const params = {
      where: {
        ...where,
        ...(pageParam && { id: { gt: pageParam } }),
      },
      orderBy,
      take: batchSize,
    };
    return await UserEntity.findMany(params, context);
  }
}
