"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const ErrorPageView_1 = __importDefault(require("@airdev/next/frontend/components/shell/ErrorPageView"));
const api_1 = require("@airent/api");
const react_1 = require("react");
function ErrorPage({ error }) {
    (0, react_1.useEffect)(() => (0, api_1.logInfo)(error), [error]);
    return (0, jsx_runtime_1.jsx)(ErrorPageView_1.default, {});
}
//# sourceMappingURL=ErrorPage.js.map