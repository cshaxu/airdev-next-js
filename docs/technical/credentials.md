# Credential Management

## Overview

Credentials are stored in three locations depending on their type:

| Location              | What lives here                                       |
| --------------------- | ----------------------------------------------------- |
| `.env.local`          | Environment variables (process.env) — gitignored      |
| `public.config.json`  | Public credentials — committed to git, not encrypted  |
| `private.config.json` | Private credentials — committed to git, **encrypted** |

## The Six Credential Types

Use this table to determine how to store a new credential:

| Type                               | Storage                                  | Encrypted | Shared across all envs | Example                             |
| ---------------------------------- | ---------------------------------------- | --------- | ---------------------- | ----------------------------------- |
| **A. Shared Env Variable**         | `.env.local` via 1password               | No        | Yes                    | `OPENAI_API_KEY`                    |
| **B. Specific Env Variable**       | `.env.local` via 1password               | No        | No                     | `INNGEST_EVENT_KEY`, `NEXTAUTH_URL` |
| **C. Shared Public Credential**    | `public.config.json` (`shared` key)      | No        | Yes                    | Google Maps API key                 |
| **D. Specific Public Credential**  | `public.config.json` (env-specific keys) | No        | No                     | Stripe publishable key              |
| **E. Shared Private Credential**   | `private.config.json` (`shared` key)     | Yes       | Yes                    | Twilio API secret                   |
| **F. Specific Private Credential** | `private.config.json` (env-specific key) | Yes       | No                     | Typesense API key                   |

## Decision Tree for New Credentials

**Question 1:** Does it need to be an Environment Variable (type A or B)?

- If used in Edge runtime → must be env var
- If the package accesses it via `process.env` directly (e.g. `next-auth` requires `NEXTAUTH_SECRET`) → must be env var
- Otherwise → proceed to Question 2

**Question 2:** Is it the same value across `local`, `development`, and `production`?

- Same value for all → Shared type (A, C, or E)
- Different per environment → Specific type (B, D, or F)

**Question 3:** Is it used in frontend/browser code?

- Frontend code → Public type (C or D)
- Backend/Edge only → Private type (E or F)

## How to Add Each Credential Type

### A. Shared Environment Variable

1. Add to Vercel project settings at **team** level
2. Add to 1password DevEnv vault, `common` key
3. Add to `scripts/env-templates/common`
4. If `NEXT_PUBLIC_*`: import in `src/common/config.ts`
5. Otherwise: import in `src/edge/config.ts` or `src/backend/config.ts`

### B. Specific Environment Variable

1. Add to Vercel project settings at **project** level
2. Add to 1password DevEnv vault, add to `local`, `development`, and `production` keys separately
3. Add to `scripts/env-templates/selectable`
4. If `NEXT_PUBLIC_*`: import in `src/common/config.ts`
5. Otherwise: import in `src/edge/config.ts` or `src/backend/config.ts`

### C. Shared Public Credential

1. Add to the `shared` JSON body in `public.config.json`
2. Import in `src/common/config.ts` using `publicSharedConfig`

### D. Specific Public Credential

1. Add to each of `local`, `development`, and `production` JSON bodies in `public.config.json`
2. Import in `src/common/config.ts` using `publicServiceEnvironmentConfig` or `publicDataEnvironmentConfig`

### E. Shared Private Credential

```bash
devtool cred set shared.<key.path> <value>
# Example: devtool cred set shared.aws.apiKey MY_KEY
```

Import in `src/backend/config.ts` using `privateSharedConfig`.

### F. Specific Private Credential

```bash
devtool cred set <env>.<key.path> <value>
# Example: devtool cred set local.typesense.apiKey MY_KEY
#          devtool cred set production.typesense.apiKey PROD_KEY
```

Import in `src/backend/config.ts` using `privateServiceEnvironmentConfig` or `privateDataEnvironmentConfig`.

## Config File Structure

### `public.config.json`

```json
{
  "service": {
    "local": { "baseUrl": "http://localhost:3000" },
    "production": { "baseUrl": "https://your-domain.com" }
  },
  "data": {
    "common": {
      "pusher": { "key": "..." }
    },
    "local": {
      "aws": { "s3Bucket": "my-bucket-local" }
    },
    "production": {
      "aws": { "s3Bucket": "my-bucket-prod" }
    }
  }
}
```

### `private.config.json`

Encrypted. Use `devtool cred set` to write, never edit directly. Structure mirrors `public.config.json` but for secrets.

### `.env.local`

```
BAREBONE_NEXT_DATABAG_PASSWORD=<decryption_key>
BAREBONE_NEXT_INTERNAL_SECRET=<internal_secret>
NEXT_PUBLIC_BAREBONE_NEXT_SERVICE_ENVIRONMENT=local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=localhost
BAREBONE_NEXT_DATABASE_URL=postgresql://root@localhost:26257/barebonedb?sslmode=disable
INNGEST_EVENT_KEY=local
```

## Accessing Credentials in Code

```typescript
// Public credentials (client + server safe)
import {
  publicSharedConfig,
  publicServiceEnvironmentConfig,
} from '@/common/config';

// Private credentials (server-only)
import {
  privateSharedConfig,
  privateServiceEnvironmentConfig,
} from '@/backend/config';

// Environment variables (direct process.env, for edge compatibility)
import { someEdgeConfig } from '@/edge/config';
```

## devtool Commands Reference

```bash
# Set encrypted credential
devtool cred set <key.path> <value>

# Reset env vars from templates (e.g. after a new var is added by teammate)
devtool env reset_vars

# Set environment for current terminal session
devtool env set local
devtool env set development
devtool env set production

# Lock environment for all sessions
devtool env lock local
devtool env lock development
devtool env lock production
```

## Security Rules

- **Never commit `.env.local`** — it is gitignored and contains the databag decryption password
- **After setting production credentials**, run `git checkout private.config.json` to restore the encrypted file to avoid accidentally committing plaintext
- **Never hardcode any credential** in source files — always go through config.ts files
- **Private config is encrypted at rest** — the encryption key lives only in `.env.local` and 1password
