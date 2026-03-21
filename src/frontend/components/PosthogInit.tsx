'use client';

import { publicConfig } from '@/common/config';
import { parseAsBoolean, useQueryState } from 'nuqs';
import posthog from 'posthog-js';
import { useEffect } from 'react';

let initialized = false;

export default function PosthogInit() {
  const { apiHost, apiToken } = publicConfig.posthog;
  const [forcePosthog] = useQueryState('forcePosthog', parseAsBoolean);
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
