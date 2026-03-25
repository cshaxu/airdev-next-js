'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { COOKIE_CONSENT_COOKIE_KEY } from '../../../common/constant';
import { useEffect, useState } from 'react';
export default function CookieBanner() {
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return !!match;
    };
    const addCookie = () => {
        document.cookie =
            `${COOKIE_CONSENT_COOKIE_KEY}=true; path=/; max-age=` +
                60 * 60 * 24 * 365;
        setShowCookieBanner(false);
    };
    useEffect(() => {
        const accepted = getCookie(COOKIE_CONSENT_COOKIE_KEY);
        if (!accepted) {
            setShowCookieBanner(true);
        }
    }, []);
    return (_jsx("div", { children: showCookieBanner ? (_jsxs("section", { className: "fixed bottom-12 left-12 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800", children: [_jsx("h2", { className: "font-semibold text-gray-800 dark:text-white", children: "\uD83C\uDF6A Cookie Notice" }), _jsx("p", { className: "mt-4 text-sm text-gray-600 dark:text-gray-300", children: "We use essential cookies to ensure that we give you the best experience on our website." }), _jsx("div", { className: "mt-4 flex shrink-0 items-center justify-between gap-x-4", children: _jsx("button", { onClick: addCookie, className: "rounded-[12px] bg-[var(--blue-primary)] px-4 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-gray-700 focus:outline-none", children: "Accept" }) })] })) : null }));
}
//# sourceMappingURL=CookieBanner.js.map