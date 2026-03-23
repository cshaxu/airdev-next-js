'use client';

import ErrorPageView from '@airdev/next/frontend/components/shell/ErrorPageView';
import { logInfo } from '@airent/api';
import { NextErrorProps } from '@airent/api-next';
import { useEffect } from 'react';

export default function ErrorPage({ error }: NextErrorProps) {
  useEffect(() => logInfo(error), [error]);

  return <ErrorPageView />;
}
