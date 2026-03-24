'use client';

import { publicConfig } from '@/config/public';
import { parseAsBoolean, useQueryState } from 'nuqs';
import posthog from 'posthog-js';
import { useEffect } from 'react';

let initialized = false;

export default function PosthogInit() {
  const [forcePosthog] = useQueryState('forcePosthog', parseAsBoolean);
  useEffect(() => {
    if (
      initialized ||
      (publicConfig.service.serviceEnvironment !== 'production' &&
        !forcePosthog)
    ) {
      return;
    }
    posthog.init(publicConfig.posthog.apiToken, {
      api_host: publicConfig.posthog.apiHost,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true, // Enable pageleave capture
    });
    initialized = true;
  }, [forcePosthog]);
  return null;
}
