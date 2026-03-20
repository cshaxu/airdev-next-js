# Backend Patterns

## Directory Overview

```
src/backend/
├── ai/              # AI/LLM integration helpers
├── config.ts        # Private credential accessor (privateSharedConfig, etc.)
├── debug/           # Debug endpoints (auto-wired by Airent)
├── deliveries/      # Email/notification delivery helpers
├── entities/        # Entity class definitions (computed fields, hooks)
├── jobs/
│   ├── background/  # Inngest background jobs (auto-wired by Airent)
│   ├── cron/        # Cron jobs via Vercel (auto-wired by Airent)
│   └── scheduled/   # Scheduled jobs via SystemScheduledJob table (auto-wired by Airent)
├── lib/
│   ├── framework.ts # Dispatcher/handler config for Airent
│   ├── handlers.ts  # Shared handler utilities
│   ├── nextauth/    # NextAuth configuration
│   ├── prisma.ts    # Prisma client singleton
│   └── typesense.ts # Typesense client singleton
├── sdks/            # Third-party SDK wrappers (OpenAI, Slack, AWS, etc.)
├── services/
│   └── data/        # Service implementations (hand-written business logic)
├── utils/           # Shared backend utilities
└── webhooks/        # Webhook handlers (auto-wired by Airent)
```

After adding/removing files in `jobs/`, `webhooks/`, or `debug/`, **always run `npm run airent`** to re-wire the routes.

---

## Background Jobs (Inngest)

Background jobs are long-running async tasks managed by Inngest.

**Source location:** `src/backend/jobs/background/`

### Creating a Background Job

1. Create a new file (or copy an existing one): `src/backend/jobs/background/my-job.ts`

2. Export exactly three things:

```typescript
import { createEvent } from 'inngest';

// 1. Event name — MUST match the filename (kebab-case)
export const event = createEvent<Params>('my-job');

// 2. Params type — defines the event payload
export type Params = {
  userId: string;
  // ...
};

// 3. Executor — the job logic
export async function executor(
  params: Params,
  rc: Context
): Promise<CommonResponse> {
  // implement job logic
  return { success: true };
}
```

3. Run `npm run airent` — Airent will automatically wire this into `src/generated/inngest.ts` and `src/app/api/inngest/route.ts`.

### Running Inngest Locally

```bash
devtool local inngest
```

This starts the local Inngest dev server. You can trigger background jobs even without actively developing a job.

### Triggering a Background Job

```typescript
import { inngest } from '@/generated/inngest';
import { event } from '@/backend/jobs/background/my-job';

await inngest.send(event({ userId: '123' }));
```

---

## Cron Jobs

Cron jobs run on a schedule via Vercel Cron.

**Source location:** `src/backend/jobs/cron/`

### Creating a Cron Job

1. Create a new file: `src/backend/jobs/cron/my-cron.ts`

2. Export three things:

```typescript
// 1. Max duration in seconds
export const maxDuration = 60;

// 2. Schedule in crontab format
export const schedule = '0 9 * * *'; // daily at 9am UTC

// 3. Executor
export async function executor(rc: Context): Promise<void> {
  // implement cron logic
}
```

3. Run `npm run airent` — wires the route in `src/app/api/jobs/` and updates `vercel.json`.

---

## Scheduled Jobs

Scheduled jobs are like background jobs but triggered at a future time, tracked in the `SystemScheduledJob` database table.

**Source location:** `src/backend/jobs/scheduled/`

### Creating a Scheduled Job

1. Create a new file: `src/backend/jobs/scheduled/my-scheduled.ts`

2. Export three things:

```typescript
// 1. Event identifier — MUST match the filename
export const event = 'my-scheduled';

// 2. Params type
export type Params = {
  userId: string;
};

// 3. Executor
export async function executor(params: Params, rc: Context): Promise<void> {
  // implement scheduled logic
}
```

3. Run `npm run airent` — wires into the scheduler via `src/generated/scheduler.ts`.

---

## Webhooks

Webhooks handle inbound HTTP requests from external services.

**Source location:** `src/backend/webhooks/`

### Creating a Webhook Handler

1. Create a new file: `src/backend/webhooks/my-service.ts`

2. Export three things:

```typescript
import { NextRequest } from 'next/server';

// 1. Authorizer — validates the webhook signature
export async function authorizer(request: NextRequest): Promise<boolean> {
  const secret = request.headers.get('x-webhook-secret');
  return secret === privateSharedConfig.myService.webhookSecret;
}

// 2. Parser — extracts typed data from the request
export async function parser(request: NextRequest): Promise<MyWebhookPayload> {
  const body = await request.json();
  return MyWebhookPayloadSchema.parse(body);
}

// 3. Executor — processes the webhook
export async function executor(
  payload: MyWebhookPayload,
  rc: Context
): Promise<void> {
  // handle the webhook event
}
```

3. Run `npm run airent` — creates `src/app/api/webhooks/my-service/route.ts`.

---

## Debug Endpoints

Debug endpoints are admin/internal-only endpoints for testing and management.

**Source location:** `src/backend/debug/`

### Creating a Debug Endpoint

1. Create a new file: `src/backend/debug/my-debug.ts`

2. Export two things:

```typescript
// 1. Parser — validates and parses request body
export async function parser(request: NextRequest): Promise<MyDebugParams> {
  const body = await request.json();
  return MyDebugParamsSchema.parse(body);
}

// 2. Executor — debug logic
export async function executor(
  params: MyDebugParams,
  rc: Context
): Promise<unknown> {
  // debug logic here
  return { result: 'ok' };
}
```

3. Run `npm run airent` — creates `src/app/api/debug/my-debug/route.ts`.

Debug endpoints require the `x-internal-secret` header matching `BAREBONE_NEXT_INTERNAL_SECRET` env var.

---

## Search Index (Typesense)

### Adding a Searchable Entity

**Step 1:** Add `search` method to the entity's YAML schema in `schemas/airent/`:

```yaml
api:
  methods:
    search: '{ requireLogin: false }'
```

**Step 2:** Define the Zod search query type in `src/common/types/data/my-entity.ts`:

```typescript
import { DEFAULT_TAKE } from '@/common/utils';

export const SearchMyEntitiesQuery = z.object({
  q: z.string().optional(),
  // filters
  status: z.string().optional(),
  // pagination
  take: z.number().default(DEFAULT_TAKE),
});
```

**Step 3:** Run `npm run airent` — generates `src/backend/services/data/my-entity-search.ts` as a skeleton.

**Step 4:** Implement the search service. Four key functions to fill in:

```typescript
// SearchDocument — the shape of indexed data in Typesense
export type MyEntitySearchDocument = {
  id: string;
  text: string;
  name: string;
  // ...
};

// dehydrate — Entity → SearchDocument (for indexing)
export function dehydrate(entity: MyEntity): MyEntitySearchDocument { ... }

// hydrate — SearchDocument → Entity shape (for search results)
export function hydrate(doc: MyEntitySearchDocument): Partial<MyEntity> { ... }

// prepareQuery — SearchQuery → Typesense query params
export function prepareQuery(query: SearchMyEntitiesQuery): TypesenseSearchParams { ... }

// batchLoader — loads all entities for full index rebuild
export async function batchLoader(): Promise<MyEntity[]> { ... }
```

**Step 5:** Add the entity to `src/backend/debug/search-index.ts` so the index can be created/reset via debug endpoint.

**Step 6:** Create the Typesense collection via curl:

```bash
curl --location 'http://localhost:3000/api/debug/search-index' \
  --header 'Content-Type: application/json' \
  --header 'x-internal-secret: internal_secret' \
  --data '{ "type": "POST", "reset": true, "indexAll": false }'
```

**Step 7:** Add indexing/un-indexing hooks in the entity file (`src/backend/entities/my-entity.ts`):

```typescript
async afterCreate(): Promise<void> {
  await searchService.index(this);
}

async afterUpdate(): Promise<void> {
  await searchService.index(this);
}

async beforeDelete(): Promise<void> {
  await searchService.unindex(this.id);
}
```

---

## Service Implementation Pattern

Services in `src/backend/services/data/` follow a consistent pattern:

```typescript
import prisma from '@/backend/lib/prisma';
import { Context } from '@/framework/context';
import { MyEntityService } from '@/generated/services/my-entity';

const service: MyEntityService = {
  async getMany(query, rc: Context) {
    const { userId } = rc.session.user; // access auth context
    return prisma.myEntity.findMany({
      where: { userId, ...buildFilters(query) },
      orderBy: { createdAt: 'desc' },
      take: query.take,
    });
  },

  async getOne(id: string, rc: Context) {
    const entity = await prisma.myEntity.findUniqueOrThrow({ where: { id } });
    // authorization check
    if (entity.userId !== rc.session.user.id) throw new ForbiddenError();
    return entity;
  },

  // ... createOne, updateOne, deleteOne
};

export default service;
```

The `Context` type (from `@/framework/context`) contains:

- `rc.session` — the NextAuth session (user id, email, etc.)
- `rc.request` — the raw Next.js request

---

## Entity Hooks Pattern

Entity classes in `src/backend/entities/` extend generated base classes and add:

1. Computed fields (getters derived from stored data)
2. Lifecycle hooks (`afterCreate`, `afterUpdate`, `beforeDelete`, etc.)

```typescript
export class MyEntity extends MyEntityBase {
  // Computed field example
  get displayName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Lifecycle hooks
  async afterCreate(): Promise<void> {
    await notifyUser(this);
  }

  async beforeDelete(): Promise<void> {
    await cleanupRelatedData(this.id);
  }
}
```

---

## Email Delivery

Email templates live in `src/emails/`. Use React Email components.

```typescript
// In src/backend/deliveries/
import { render } from '@react-email/render';
import MyEmailTemplate from '@/emails/my-email';
import { postmarkClient } from '@/backend/sdks/postmark';

export async function sendMyEmail(to: string, data: MyEmailData) {
  const html = await render(<MyEmailTemplate {...data} />);
  await postmarkClient.sendEmail({
    From: 'noreply@yourdomain.com',
    To: to,
    Subject: 'Your Subject',
    HtmlBody: html,
  });
}
```

Preview emails locally: `npm run email` (opens at http://localhost:3600)

---

## Framework Config (`src/backend/lib/framework.ts`)

This file exports the dispatcher and handler configurations used by Airent-generated routes:

- `dispatcherConfig` — controls request dispatching behavior
- `handlerConfig` — controls route handler behavior (auth checks, error handling)

Modify this file to change global request handling behavior (e.g., adding request logging, changing how auth errors are reported).
