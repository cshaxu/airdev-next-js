'use client';

import { useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { useEffect } from 'react';

let initialized = false;

type Props = {
  apiHost: string;
  apiToken: string;
  environment: string;
};

export default function PosthogInit({ apiHost, apiToken, environment }: Props) {
  const searchParams = useSearchParams();
  const forcePosthog = ['1', 'true'].includes(
    searchParams.get('forcePosthog')?.toLowerCase() ?? ''
  );
  useEffect(() => {
    if (initialized || (environment !== 'production' && !forcePosthog)) {
      return;
    }
    posthog.init(apiToken, {
      api_host: apiHost,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
    });
    initialized = true;
  }, [environment, forcePosthog, apiToken, apiHost]);
  return null;
}
