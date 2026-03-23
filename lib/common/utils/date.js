"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestDs = exports.addDsDays = exports.toEndTime = exports.toStartTime = void 0;
exports.getDsArray = getDsArray;
const api_1 = require("@airent/api");
const date_fns_1 = require("date-fns");
function toDs(date) {
    date = date ?? new Date();
    const year = date.getUTCFullYear();
    const options = { minimumIntegerDigits: 2, useGrouping: false };
    const motnh = (date.getUTCMonth() + 1).toLocaleString('en-US', options);
    const day = date.getUTCDate().toLocaleString('en-US', options);
    return `${year}-${motnh}-${day}`;
}
const toStartTime = (ds) => new Date(`${ds}T00:00:00.000Z`);
exports.toStartTime = toStartTime;
const toEndTime = (ds) => (0, date_fns_1.addDays)((0, exports.toStartTime)(ds), 1);
exports.toEndTime = toEndTime;
const addDsDays = (ds, days) => toDs((0, date_fns_1.addDays)((0, exports.toStartTime)(ds), days));
exports.addDsDays = addDsDays;
const getLatestDs = () => toDs((0, date_fns_1.subDays)(new Date(), 1));
exports.getLatestDs = getLatestDs;
function getDsArray(from, to) {
    const minDs = (0, api_1.min)([from, to]);
    const maxDs = (0, api_1.max)([from, to]);
    const result = [];
    let ds = minDs;
    while (ds <= maxDs) {
        result.push(ds);
        ds = (0, exports.addDsDays)(ds, 1);
    }
    return result;
}
//# sourceMappingURL=date.js.map