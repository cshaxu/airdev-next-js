import { pick } from 'lodash-es';
import type { AdapterAccount } from 'next-auth/adapters';
import type { UpdateOneNextauthAccountBody } from './types';

export function updateOneNextauthAccountBodyFromAdapterAccount(
  account: AdapterAccount
): UpdateOneNextauthAccountBody {
  return {
    ...pick(account, [
      'provider',
      'providerAccountId',
      'type',
      'userId',
    ] as const),
    access_token: account.access_token ?? null,
    expires_at: account.expires_at ?? null,
    id_token: account.id_token ?? null,
    refresh_token: account.refresh_token ?? null,
    scope: account.scope ?? null,
    session_state:
      typeof account.session_state === 'string' ? account.session_state : null,
    token_type: account.token_type ?? null,
  };
}
