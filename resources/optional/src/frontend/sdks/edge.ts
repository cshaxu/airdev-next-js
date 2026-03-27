/* "@airdev/next": "seeded" */

import { RevalidateQuery, RevalidateResult } from '@/common/types/api/edge';
import { fetchJsonOrThrow, queryStringify } from '@airent/api';

const revalidate = (query: RevalidateQuery): Promise<RevalidateResult> =>
  fetchJsonOrThrow(
    `/api/edge/revalidate?${queryStringify({ tag: query.tag })}`,
    { credentials: 'include', method: 'POST' }
  ).then((r) => r as RevalidateResult);

const EdgeApiClient = { revalidate };

export default EdgeApiClient;
