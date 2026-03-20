import { getTake } from '@/common/utils/zod';
import { SearchParams } from 'typesense/lib/Typesense/Documents';

export type SearchGeoQuery = {
  q?: string;
  lat?: number;
  lng?: number;
  radiusMi?: number;
  take?: number;
};

export function prepareGeoQuery<Q extends SearchGeoQuery>(
  query: Q,
  queryByField: string,
  geoPointField: string,
  additionalFilters?: string[],
  defaultSortBy?: string
): SearchParams {
  const { q: qRaw, lat, lng, radiusMi } = query;
  let sort_by = defaultSortBy;

  const q = qRaw?.length ? qRaw : '*';
  const query_by = queryByField;
  if (sort_by === undefined && q !== '*') {
    sort_by = '_text_match:desc';
  }

  const filters = [...(additionalFilters ?? [])];
  if (lat && lng && radiusMi) {
    filters.push(`${geoPointField}:(${lat},${lng},${radiusMi}mi)`);
    sort_by = `${geoPointField}(${lat}, ${lng}):asc`;
  }
  const filter_by = filters.length ? filters.join(' && ') : undefined;

  const per_page = getTake(query);

  return { q, query_by, sort_by, filter_by, per_page };
}
