# Claude Code Guidelines — barebone-next

> Optimize for **Code Readability** over performance and everything else.

## Tech Stack Quick Reference

| Layer           | Technology                                |
| --------------- | ----------------------------------------- |
| Framework       | Next.js 15 (App Router), React 19         |
| Auth            | NextAuth v4 (Google OAuth + Email/Code)   |
| Database        | CockroachDB (via Prisma 6)                |
| ORM             | Prisma — schema in `prisma/schema.prisma` |
| Code Gen        | **Airent** (`npm run airent`)             |
| Styling         | Tailwind CSS v4 (PostCSS), Radix UI       |
| State (server)  | TanStack Query v5 (generated hooks)       |
| State (client)  | Zustand v5, Jotai                         |
| Forms           | React Hook Form + Zod                     |
| Background Jobs | Inngest                                   |
| Search          | Typesense                                 |
| Real-time       | Pusher                                    |
| Email           | React Email + Postmark                    |
| AI/LLM          | OpenAI SDK, Vercel AI SDK                 |
| Deployment      | Vercel                                    |

## Critical Rules

### NEVER edit files in `src/generated/` or `src/app/api/data/`

These are **100% auto-generated** by Airent. Any manual edits will be overwritten on the next `npm run airent`. To change behavior, modify:

- Schemas: `schemas/airent/*.yaml`
- Entity logic: `src/backend/entities/*.ts`
- Service impls: `src/backend/services/data/*.ts`
- Templates/augmentors: `plugins/airent/`

### Run `npm run pre-build` after any of these changes

- `prisma/schema.prisma` edited
- Any file in `schemas/airent/` edited
- Any file in `src/backend/jobs/background/`, `jobs/cron/`, `webhooks/`, or `debug/` added/removed

### `context.currentUser` is for permission checks only

Never use `context.currentUser.id` to create, update, or load data. The `userId` (or equivalent owner ID) must always be explicitly passed by the client in the request body or query params. `context.currentUser` is only used to verify that the requester is who they claim to be — not as a data source.

```typescript
// WRONG — infers userId from session
const chat = await ChatEntity.create(
  { data: { userId: context.currentUser!.id } },
  context
);

// CORRECT — client passes userId explicitly; context only used for the selfOrThrow check
const beforeCreateOne = (body: CreateOneChatBody, context: Context) =>
  selfOrThrow(context, body.userId);
async function createOne(body: CreateOneChatBody, context: Context) {
  const { userId } = body;
  return await ChatEntity.create({ data: { userId } }, context);
}
```

### Never pass `currentUserId` (or current user data) as component props

Always call `useCurrentUser()` directly inside the component that needs it. Never thread current-user data down through props.

```typescript
// WRONG — parent fetches and drills down
<SomeCard item={item} currentUserId={currentUser.id} />

// CORRECT — component owns its own auth context
export default function SomeCard({ item }: Props) {
  const currentUser = useCurrentUser();
  const isOwner = item.userId === currentUser.id;
}
```

### Always use curly braces for `if` and `for` statements

Never write bracketless single-line bodies. Always use `{}` even for one-liners.

```typescript
// WRONG
if (condition) doSomething();
for (const item of items) process(item);

// CORRECT
if (condition) {
  doSomething();
}
for (const item of items) {
  process(item);
}
```

### Never use raw Airent `EntityResponse` types directly

Always use `SelectedEntityResponse<typeof FieldRequest>` (or the entity-specific alias like `SelectedUserResponse`) with the appropriate field request constant. Never reference bare generated response types like `UserResponse`.

```typescript
// WRONG
user: UserResponse;

// CORRECT
user: SelectedUserResponse<typeof GetManyUsersFieldRequest>;
```

### Never create API route files manually

All API endpoints must go through the Airent YAML schema → code generation pipeline. To add a new endpoint, add the method to the appropriate `schemas/airent/*.yml` file and run `npm run pre-build`. Never create `route.ts` files under `src/app/api/` by hand — doing so requires explicit user approval.

### Always use `<Link>` for navigation; never `router.push` for user-initiated navigation

Use Next.js `<Link href="...">` for all user-initiated navigation (breadcrumbs, cards, menu items, buttons that navigate). Only use `router.push` / `router.replace` for **programmatic** navigation after an async operation (e.g. redirect after form submit).

```typescript
// WRONG — causes full-page-reload perception
<button onClick={() => router.push('/chats')}>Chats</button>

// CORRECT
<Link href="/chats">Chats</Link>

// OK — programmatic redirect after mutation
onSuccess: () => router.push('/chats')
```

Also ensure `BreadcrumbLink` and similar UI primitives use `Link`, not `<a>`.

### Every `page.tsx` with `useSuspenseQuery` must have a sibling `loading.tsx`

`useSuspenseQuery` suspends the component until data is available. Without a `loading.tsx`, navigating to the page causes a blank flash. Every route segment that uses suspending queries must have a `loading.tsx` that provides a skeleton fallback — Next.js uses it automatically as the Suspense boundary.

```
src/app/(protected)/chats/
  page.tsx          ← uses useSuspenseQuery
  loading.tsx       ← required: skeleton shown during data fetch
```

### NEVER run database migrations against remote environments without explicit user approval

- `devtool db migration deploy production` — **DANGEROUS**, changes production DB
- Always test migrations locally first: `devtool db migration deploy local`

## Key Scripts

```bash
npm run dev            # Generate API types + start dev server
npm run pre-build      # prisma generate + full airent regeneration
npm run airent         # Full airent regeneration (wipes src/generated & src/app/api/data)
npm run build          # pre-build + compile + post-build
npm run pre-build      # Full regeneration pass
npm run format:fix     # Prettier format (run before committing)
npm run lint           # ESLint check
devtool env set local  # Switch env for current terminal session to `local` tier
devtool env lock local # Lock env for all terminal sessions to `local` tier
```

## Path Aliases

All `@/` paths resolve to `src/`. Examples:

- `@/backend/lib/prisma` → `src/backend/lib/prisma.ts`
- `@/common/config` → `src/common/config.ts`
- `@/framework/context` → `src/framework/context.ts`

## Source Layout

```
src/
├── app/              # Next.js App Router (pages + API routes)
├── backend/          # Server-only code
│   ├── ai/           # Functions leveraging LLMs (hand-written logic)
│   ├── deliveries/   # Logic to send notifications to users (hand-written)
│   ├── entities/     # Airent entity definitions (hand-written logic)
│   ├── services/      # Service implementations (hand-written logic)
│   ├── jobs/         # background/, cron/, scheduled/
│   ├── lib/          # Backend framework-level code (nextauth, prisma, etc.)
│   ├── sdks/         # Standardized external vendor APIs (e.g. aws, slack)
│   ├── webhooks/     # Webhook handlers (hand-written logic)
│   └── debug/        # Debug endpoints (hand-written logic)
├── common/           # Shared types and config (client + server safe)
├── edge/             # Edge runtime code
├── emails/           # React Email templates
├── framework/        # Auth context + request framework
├── frontend/         # Client-only code (components, hooks, stores)
└── generated/        # AUTO-GENERATED — do not edit
```

## Credential Management

Three config files, each with a different purpose:

- **`.env.local`** — env vars (NEXTAUTH_URL, DATABASE_URL, secrets that need `process.env`)
- **`public.config.json`** — public credentials committed to git (Pusher key, S3 bucket names, etc.)
- **`private.config.json`** — encrypted private credentials committed to git (API keys, OAuth secrets)

To add/update a private credential: `devtool cred set <key.path> <value>`

**Never hardcode credentials.** See [docs/technical/credentials.md](docs/technical/credentials.md) for the full credential type decision tree.

## Airent Code Generation Overview

Airent generates the entire data layer from:

1. Prisma schema (`prisma/schema.prisma`) — table structure
2. YAML schemas (`schemas/airent/*.yaml`) — API methods, field exposure, access control
3. Entity files (`src/backend/entities/*.ts`) — computed fields and lifecycle hooks

After modifying any of the above, run `npm run pre-build`.

See [docs/technical/airent.md](docs/technical/airent.md) for full Airent workflow details.

## Database Workflow

```bash
# Pull latest schema from remote
devtool db pull_schema

# After editing prisma/schema.prisma:
npx prisma generate              # Update Prisma client
devtool db migration create <name>   # Generate migration SQL
devtool db migration deploy local    # Test locally
```

DB schema PRs must contain ONLY schema changes — no business logic.
See [docs/technical/database.md](docs/technical/database.md) for full migration workflow.

## Adding Backend Features

| Feature        | Source path                    | After adding     |
| -------------- | ------------------------------ | ---------------- |
| Background job | `src/backend/jobs/background/` | `npm run airent` |
| Cron job       | `src/backend/jobs/cron/`       | `npm run airent` |
| Scheduled job  | `src/backend/jobs/scheduled/`  | `npm run airent` |
| Webhook        | `src/backend/webhooks/`        | `npm run airent` |
| Debug endpoint | `src/backend/debug/`           | `npm run airent` |
| Search index   | YAML schema + service impl     | `npm run airent` |

See [docs/technical/backend-patterns.md](docs/technical/backend-patterns.md) for implementation patterns.

## Frontend Patterns

- Use **generated TanStack hooks** from `src/generated/tanstack-hooks/` for all data fetching
- Use **Zustand** (`src/frontend/stores/`) for global UI state
- Use **Jotai** for atomic/local component state
- Use **React Hook Form + Zod** for all forms
- UI primitives live in `src/frontend/components/ui/` (Radix-based)

See [docs/technical/frontend-patterns.md](docs/technical/frontend-patterns.md) for usage patterns.

## Detailed Documentation

- [docs/technical/tech-stack.md](docs/technical/tech-stack.md) — Full dependency inventory
- [docs/technical/airent.md](docs/technical/airent.md) — Airent schema authoring & code generation
- [docs/technical/database.md](docs/technical/database.md) — Prisma schema & migration workflow
- [docs/technical/credentials.md](docs/technical/credentials.md) — Credential type decision tree & procedures
- [docs/technical/backend-patterns.md](docs/technical/backend-patterns.md) — Jobs, webhooks, search, debug endpoints
- [docs/technical/frontend-patterns.md](docs/technical/frontend-patterns.md) — TanStack hooks, stores, forms, components
- [docs/technical/dev-workflow.md](docs/technical/dev-workflow.md) — Full local dev setup & daily workflow
