import { intersectionWith, isEqual } from 'lodash-es';

export const intersect = <T>(a: T[], b: T[]) =>
  intersectionWith(a, b, isEqual).length > 0;
