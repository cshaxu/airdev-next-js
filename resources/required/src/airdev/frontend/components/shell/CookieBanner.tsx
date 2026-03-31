/* "@airdev/next": "managed" */

'use client';

import { COOKIE_CONSENT_COOKIE_KEY } from '@/airdev/common/constant';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const getCookie = (name: string) => {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
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

  return (
    <div>
      {showCookieBanner ? (
        <section className="fixed bottom-12 left-12 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            🍪 Cookie Notice
          </h2>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            We use essential cookies to ensure that we give you the best
            experience on our website.
          </p>

          <div className="mt-4 flex shrink-0 items-center justify-between gap-x-4">
            <button
              onClick={addCookie}
              className="bg-primary hover:bg-primary-hover rounded-[12px] px-4 py-2.5 text-xs font-medium text-white transition-colors duration-300 focus:outline-none"
            >
              Accept
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
