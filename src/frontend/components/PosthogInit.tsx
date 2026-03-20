'use client';

import {
  IS_SERVICE_PRODUCTION,
  POSTHOG_API_HOST,
  POSTHOG_API_TOKEN,
} from '@/common/config';
import { parseAsBoolean, useQueryState } from 'nuqs';
import posthog from 'posthog-js';
import { useEffect } from 'react';

let initialized = false;

export default function PosthogInit() {
  const [forcePosthog] = useQueryState('forcePosthog', parseAsBoolean);
  useEffect(() => {
    if (initialized || (!IS_SERVICE_PRODUCTION && !forcePosthog)) {
      return;
    }
    posthog.init(POSTHOG_API_TOKEN, {
      api_host: POSTHOG_API_HOST,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
    });
    initialized = true;
  }, [forcePosthog]);
  return null;
}
