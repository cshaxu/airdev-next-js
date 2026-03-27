/* "@airdev/next": "managed" */

import { publicAppConfig } from '@/config/public-app';
import { fetchJsonOrThrow } from '@airent/api';

export const callBackendJsonApi = (
  path: string,
  body: Record<string, any>,
  options: RequestInit = {}
) =>
  fetchJsonOrThrow(`${publicAppConfig.service.apiClientBaseUrl}${path}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });

export const callBackendApi = (
  path: string,
  body: Record<string, any>,
  options: RequestInit = {}
) =>
  fetch(`${publicAppConfig.service.apiClientBaseUrl}${path}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
