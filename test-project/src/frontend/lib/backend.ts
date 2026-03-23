import { API_CLIENT_BASE_URL } from '@/common/config';
import { fetchJsonOrThrow } from '@airent/api';

export const callBackendJsonApi = (
  path: string,
  body: Record<string, any>,
  options: RequestInit = {}
) =>
  fetchJsonOrThrow(`${API_CLIENT_BASE_URL}${path}`, {
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
  fetch(`${API_CLIENT_BASE_URL}${path}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
