# Development Workflow

## Initial Setup (First Time)

### Prerequisites

- Node.js (see `package.json` engines for required version)
- CockroachDB installed locally
- 1Password CLI (for credential management)
- `@airdev/tool` devtool (installed via npm)

### Setup Steps

1. **Clone and install:**

   ```bash
   git clone <repo-url>
   cd barebone-next
   npm install
   ```

2. **Set up post-merge hook:**

   ```bash
   echo "source \$REPO_PATH/scripts/post-merge.sh" > .git/hooks/post-merge
   ```

3. **Set up environment variables:**

   ```bash
   devtool env lock local
   ```

   This populates `.env.local` from 1password.

4. **Start local CockroachDB** and deploy migrations:

   ```bash
   devtool db migration deploy local
   npx prisma db seed
   ```

5. **Run pre-build to generate code:**

   ```bash
   npm run pre-build
   ```

6. **Start dev server:**
   ```bash
   npm run dev
   ```
   App is available at http://localhost:3000

---

## Daily Development Loop

### Start the Day

```bash
git pull origin main
npm run dev          # starts dev server after regenerating API types
```

If dependencies changed or things are broken:

```bash
npm run pre-build    # full regeneration pass
```

### When to Run `npm run pre-build`

Run after any of these changes:

- Edited `prisma/schema.prisma`
- Edited any file in `schemas/airent/`
- Added/removed files in `src/backend/jobs/background/`, `jobs/cron/`, `jobs/scheduled/`, `webhooks/`, or `debug/`

### Before Committing

```bash
npm run format:fix   # auto-fix Prettier formatting
npm run build        # verify the production build compiles cleanly
```

If lint errors appear:

```bash
npm run lint         # check for ESLint issues
```

---

## Environment Management

Environments: `local`, `production`

```bash
# Switch active environment (current terminal session only)
devtool env set local
devtool env set production

# Switch active environment (all future terminal sessions)
devtool env lock local
devtool env lock production

# Refresh env vars from 1password (after teammate adds a new var)
devtool env reset_vars
```

View each environment's database:

```bash
devtool db view             # current env
devtool db view local       # local CockroachDB
devtool db view development # remote dev cluster
devtool db view production  # remote prod cluster
```

---

## Running the App

### Standard Dev (with hot reload)

```bash
npm run dev
```

### With Turbopack (faster builds)

```bash
npm run dev-turbo
```

### With HTTPS (for testing auth on localhost)

```bash
npm run dev-https
```

### Email Templates Preview

```bash
npm run email          # http://localhost:3600
```

### Background Job Runner (Inngest)

```bash
devtool local inngest  # starts local Inngest dev server
```

---

## Making Code Changes

### New Feature Checklist

1. **Schema change needed?** → Follow [database.md](database.md) migration workflow
2. **New entity?** → Follow [airent.md](airent.md) entity creation guide
3. **New service method?** → Edit `src/backend/services/data/{entity}.ts`
4. **New background job?** → See [backend-patterns.md](backend-patterns.md) — then `npm run airent`
5. **New webhook?** → See [backend-patterns.md](backend-patterns.md) — then `npm run airent`
6. **New credential?** → See [credentials.md](credentials.md) decision tree
7. **Frontend data display?** → Use generated TanStack hooks from `src/generated/tanstack-hooks/`
8. **New UI component?** → Add to `src/frontend/components/`, use Radix primitives from `src/frontend/components/ui/`

### File Creation Guidelines

| What you need                | Where to create it                          |
| ---------------------------- | ------------------------------------------- |
| New page                     | `src/app/(protected)/your-feature/page.tsx` |
| New API endpoint (data CRUD) | Do not create — use Airent                  |
| New API endpoint (custom)    | `src/app/api/json/your-endpoint/route.ts`   |
| New streaming endpoint       | `src/app/api/stream/your-stream/route.ts`   |
| New email template           | `src/emails/your-email.tsx`                 |
| New background job           | `src/backend/jobs/background/your-job.ts`   |
| New cron job                 | `src/backend/jobs/cron/your-cron.ts`        |
| New webhook handler          | `src/backend/webhooks/your-webhook.ts`      |
| New debug endpoint           | `src/backend/debug/your-debug.ts`           |
| New Zustand store            | `src/frontend/stores/your-store.ts`         |
| New shared type              | `src/common/types/your-type.ts`             |
| New entity type              | `src/common/types/data/your-entity.ts`      |

---

## Debugging

### VS Code Debug Config

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Debug Endpoints

Test internal endpoints directly:

```bash
# Test env variables are loading correctly
curl http://localhost:3000/api/debug/test-env \
  -H 'x-internal-secret: internal_secret'

# Test email delivery
curl http://localhost:3000/api/debug/test-email \
  -H 'x-internal-secret: internal_secret' \
  -H 'Content-Type: application/json' \
  -d '{"to": "you@example.com"}'

# Manage search index
curl http://localhost:3000/api/debug/search-index \
  -H 'x-internal-secret: internal_secret' \
  -H 'Content-Type: application/json' \
  -d '{"type": "POST", "reset": true, "indexAll": false}'
```

### TanStack Query DevTools

In development, TanStack Query DevTools are available at the bottom of the screen in any page wrapped by `ReactQueryProvider`.

### Common Issues

**`src/generated/` has type errors after pull:**

```bash
npm run pre-build
```

**Prisma client out of sync:**

```bash
npx prisma generate
```

**Everything is broken after pulling:**

```bash
npm run update
```

**Local DB connection refused:**

- Make sure CockroachDB is running locally
- Check `BAREBONE_NEXT_DATABASE_URL` in `.env.local`

**Auth not working locally:**

- Check `NEXTAUTH_URL=http://localhost:3000` in `.env.local`
- Check `NEXTAUTH_SECRET` is set
- Check Google OAuth credentials in `private.config.json`

---

## Deployment

### Environments

| Branch       | Vercel Project | Environment |
| ------------ | -------------- | ----------- |
| `main`       | dev project    | Development |
| `production` | prod project   | Production  |

### Deploy to Development

Push to `main` — Vercel auto-deploys.

### Deploy to Production

Rebase latest `main` changes onto the `production` branch, then push:

```bash
git checkout production
git rebase main
git push origin production
```

### Database Migrations on Deployment

Database migrations are **not** run automatically on deploy. They must be run manually before or after deploying the code, following the [database.md](database.md) workflow.

---

## Code Quality

### Prettier (Formatting)

Prettier is configured with:

- `prettier-plugin-organize-imports` — auto-sorts imports
- `prettier-plugin-tailwindcss` — auto-sorts Tailwind classes

```bash
npm run format       # check formatting
npm run format:fix   # auto-fix formatting
```

### ESLint

```bash
npm run lint
```

Custom rules (via `@airdev/eslint`):

- No unused imports
- Enforce React hook dependencies
- Generated files are excluded from linting

### Find Unused Code

```bash
npm run knip
```

---

## Useful `devtool` Commands Reference

```bash
# Environment
devtool env set <env>         # set env for current session
devtool env lock <env>        # set env for all sessions
devtool env reset_vars        # refresh env vars from 1password

# Database
devtool db view [env]         # open DB browser
devtool db pull_schema        # pull schema from remote
devtool db migration create <name>    # create migration
devtool db migration deploy <env>     # deploy migration to env

# Credentials
devtool cred set <key.path> <value>   # set encrypted credential

# Local services
devtool local inngest          # start local Inngest runner
devtool local cockroach reset  # reset local CockroachDB (destructive)
```
