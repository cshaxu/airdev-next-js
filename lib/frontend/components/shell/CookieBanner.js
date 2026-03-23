"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CookieBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function CookieBanner() {
    const [showCookieBanner, setShowCookieBanner] = (0, react_1.useState)(false);
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return !!match;
    };
    const addCookie = () => {
        document.cookie =
            'cookie_consent=true; path=/; max-age=' + 60 * 60 * 24 * 365;
        setShowCookieBanner(false);
    };
    (0, react_1.useEffect)(() => {
        const accepted = getCookie('cookie_consent');
        if (!accepted) {
            setShowCookieBanner(true);
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { children: showCookieBanner ? ((0, jsx_runtime_1.jsxs)("section", { className: "fixed bottom-12 left-12 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-semibold text-gray-800 dark:text-white", children: "\uD83C\uDF6A Cookie Notice" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-sm text-gray-600 dark:text-gray-300", children: "We use essential cookies to ensure that we give you the best experience on our website." }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 flex shrink-0 items-center justify-between gap-x-4", children: (0, jsx_runtime_1.jsx)("button", { onClick: addCookie, className: "rounded-[12px] bg-[var(--blue-primary)] px-4 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none", children: "Accept" }) })] })) : null }));
}
//# sourceMappingURL=CookieBanner.js.map