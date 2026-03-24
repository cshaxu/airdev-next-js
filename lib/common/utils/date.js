import { max, min } from '@airent/api';
import { addDays, subDays } from 'date-fns';
export function toDs(date) {
    date = date ?? new Date();
    const year = date.getUTCFullYear();
    const options = { minimumIntegerDigits: 2, useGrouping: false };
    const motnh = (date.getUTCMonth() + 1).toLocaleString('en-US', options);
    const day = date.getUTCDate().toLocaleString('en-US', options);
    return `${year}-${motnh}-${day}`;
}
export const toStartTime = (dateOrDs) => new Date(`${dateOrDs instanceof Date ? toDs(dateOrDs) : dateOrDs}T00:00:00.000Z`);
export const toEndTime = (dateOrDs) => addDays(toStartTime(dateOrDs), 1);
export const addDsDays = (dateOrDs, days) => toDs(addDays(toStartTime(dateOrDs), days));
export const getLatestDs = () => toDs(subDays(new Date(), 1));
export const getCurrentDs = () => toDs(new Date());
export const compareDs = (ds1, ds2) => {
    const ts1 = toStartTime(ds1).getTime();
    const ts2 = toStartTime(ds2).getTime();
    if (ts1 < ts2) {
        return -1;
    }
    else if (ts1 > ts2) {
        return 1;
    }
    else {
        return 0;
    }
};
export function getDsArray(from, to) {
    const minDs = min([from, to]);
    const maxDs = max([from, to]);
    const result = [];
    let ds = minDs;
    while (ds <= maxDs) {
        result.push(ds);
        ds = addDsDays(ds, 1);
    }
    return result;
}
//# sourceMappingURL=date.js.map