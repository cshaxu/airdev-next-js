'use client';

import { publicConfig } from '@airdev/next/common/config';
import { useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { useEffect } from 'react';

let initialized = false;

export default function PosthogInit() {
  const { apiHost, apiToken } = publicConfig.posthog;
  const searchParams = useSearchParams();
  const forcePosthog = ['1', 'true'].includes(
    searchParams.get('forcePosthog')?.toLowerCase() ?? ''
  );
  useEffect(() => {
    if (
      initialized ||
      (publicConfig.service.environment !== 'production' && !forcePosthog)
    ) {
      return;
    }
    posthog.init(apiToken, {
      api_host: apiHost,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
    });
    initialized = true;
  }, [forcePosthog, apiToken, apiHost]);
  return null;
}
