import { max, min } from '@airent/api';
import { addDays, subDays } from 'date-fns';

function toDs(date?: Date): string {
  date = date ?? new Date();
  const year = date.getUTCFullYear();
  const options = { minimumIntegerDigits: 2, useGrouping: false };
  const motnh = (date.getUTCMonth() + 1).toLocaleString('en-US', options);
  const day = date.getUTCDate().toLocaleString('en-US', options);
  return `${year}-${motnh}-${day}`;
}

export const toStartTime = (ds: string) => new Date(`${ds}T00:00:00.000Z`);

export const toEndTime = (ds: string) => addDays(toStartTime(ds), 1);

export const addDsDays = (ds: string, days: number) =>
  toDs(addDays(toStartTime(ds), days));

export const getLatestDs = () => toDs(subDays(new Date(), 1));

export function getDsArray(from: string, to: string): string[] {
  const minDs = min([from, to])!;
  const maxDs = max([from, to])!;
  const result = [];
  let ds = minDs;
  while (ds <= maxDs) {
    result.push(ds);
    ds = addDsDays(ds, 1);
  }
  return result;
}
