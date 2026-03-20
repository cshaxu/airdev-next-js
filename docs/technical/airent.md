# Airent Code Generation

Airent is the code generation framework that powers the entire data layer. It reads Prisma schema and YAML entity schemas, then generates type-safe REST API clients, server handlers, TanStack Query hooks, and Next.js route files.

## The Golden Rule

**Never manually edit files in `src/generated/` or `src/app/api/data/`.**

These directories are fully regenerated on every `npm run airent` run. All customization goes in:

- `schemas/airent/` — YAML schema files (API methods, field config)
- `src/backend/entities/` — TypeScript entity classes (computed fields, lifecycle hooks)
- `src/backend/services/data/` — Service implementations (business logic)
- `plugins/airent/` — Custom augmentors and EJS templates

## How It Works

```
prisma/schema.prisma
        ↓
@airent/prisma  (generates intermediate schemas)
        ↓
schemas/airent/*.yaml  (you add API methods, access control, field config)
        ↓
airent + augmentors  (applies templates)
        ↓
src/generated/           src/app/api/data/
├── tanstack-hooks/      ├── get-many-{entity}/route.ts
├── clients/             ├── get-one-{entity}/route.ts
├── handlers/            ├── create-one-{entity}/route.ts
├── dispatchers/         ├── update-one-{entity}/route.ts
├── services/            ├── delete-one-{entity}/route.ts
├── actions/             └── search-{entity}/route.ts
├── server-clients/
└── edge-clients/
```

## Running Code Generation

```bash
# Full regeneration (wipes generated dirs and rebuilds everything)
npm run airent

# Same as above plus prisma generate (use this after schema changes)
npm run pre-build

# Quick regen of only API route wiring (used by npm run dev)
npx airent-api-next generate
```

## Adding a New Entity

### Step 1: Add to Prisma Schema

Edit `prisma/schema.prisma` to add the new model. Then:

```bash
npx prisma generate
devtool db migration create <migration-name>
devtool db migration deploy local
```

### Step 2: Create/Update the YAML Schema

Airent generates a base YAML in `schemas/airent/` from the Prisma model. Review and extend it:

```yaml
name: MyEntity # PascalCase entity name
api:
  request:
    import: '@/common/types/data/my-entity' # Zod types for request bodies
  methods:
    getMany: '{ requireLogin: true }'
    getOne: '{ requireLogin: true }'
    getOneSafe: '{ requireLogin: false }' # Public read endpoint
    createOne: '{ requireLogin: true }'
    updateOne: '{ requireLogin: true }'
    deleteOne: '{ requireLogin: true }'
    search: '{ requireLogin: false }' # Typesense search endpoint
```

Available method options:

- `requireLogin: true/false` — whether the endpoint requires authentication
- `requireCron: true` — cron-only endpoint
- `requireInternal: true` — internal/debug endpoint

Fields section controls which fields are included in API responses:

```yaml
fields:
  - name: id
  - name: createdAt
  - name: name
  - name: sensitiveField
    api: skip # exclude from API response
```

### Step 3: Create the Entity Class

Create `src/backend/entities/my-entity.ts`. This is where you add computed fields and lifecycle hooks. The generated service template in `src/backend/services/data/my-entity.ts` is skippable — don't overwrite your custom logic.

Entity hooks available:

```typescript
// Called after entity is loaded from DB
async afterLoad(): Promise<void>

// Called before create
async beforeCreate(): Promise<void>

// Called after create
async afterCreate(): Promise<void>

// Called before update
async beforeUpdate(): Promise<void>

// Called after update
async afterUpdate(): Promise<void>

// Called before delete
async beforeDelete(): Promise<void>
```

### Step 4: Create Zod Type Definitions

Create `src/common/types/data/my-entity.ts` with Zod schemas for request bodies:

```typescript
import { z } from 'zod';

export const CreateMyEntityBody = z.object({
  name: z.string().min(1),
  // ...
});

export const UpdateMyEntityBody = z.object({
  name: z.string().min(1).optional(),
  // ...
});
```

### Step 5: Run Pre-build

```bash
npm run pre-build
```

This regenerates all files in `src/generated/` and `src/app/api/data/`.

### Step 6: Implement Service Logic

Edit `src/backend/services/data/my-entity.ts` — this is the hand-written service file. It is skippable (Airent will not overwrite it on subsequent runs). Implement the actual data fetching, filtering, and authorization logic here.

## Generated File Reference

After running `npm run airent`, for each entity `MyEntity` you get:

| File                                                      | Description                                         |
| --------------------------------------------------------- | --------------------------------------------------- |
| `src/generated/tanstack-hooks/my-entity-types.ts`         | TypeScript types for hooks                          |
| `src/generated/tanstack-hooks/my-entity-base.ts`          | Base query key definitions                          |
| `src/generated/tanstack-hooks/my-entity-client.ts`        | Client-side hooks (`useGetMany`, `useCreate`, etc.) |
| `src/generated/tanstack-hooks/my-entity-server.ts`        | Server-side fetch functions                         |
| `src/generated/tanstack-hooks/my-entity-server-cached.ts` | Cached server fetch functions                       |
| `src/generated/clients/my-entity.ts`                      | REST API client (fetch calls)                       |
| `src/generated/server-clients/my-entity.ts`               | Server-side API client                              |
| `src/generated/server-clients/my-entity-cached.ts`        | Cached server-side client                           |
| `src/generated/handlers/my-entity.ts`                     | Route handler implementation                        |
| `src/generated/dispatchers/my-entity.ts`                  | Request dispatcher config                           |
| `src/generated/actions/my-entity.ts`                      | Next.js server actions                              |
| `src/generated/services/my-entity.ts`                     | Service interface (types only)                      |
| `src/generated/edge-clients/my-entity.ts`                 | Edge-compatible client                              |
| `src/app/api/data/get-many-my-entities/route.ts`          | GET /api/data/get-many-my-entities                  |
| `src/app/api/data/get-one-my-entity/route.ts`             | GET /api/data/get-one-my-entity                     |
| `src/app/api/data/get-one-my-entity-safe/route.ts`        | Public GET endpoint                                 |
| `src/app/api/data/create-one-my-entity/route.ts`          | POST /api/data/create-one-my-entity                 |
| `src/app/api/data/update-one-my-entity/route.ts`          | PUT /api/data/update-one-my-entity                  |
| `src/app/api/data/delete-one-my-entity/route.ts`          | DELETE /api/data/delete-one-my-entity               |
| `src/app/api/data/search-my-entities/route.ts`            | POST /api/data/search-my-entities                   |

## Plugins & Custom Templates

Custom Airent augmentors and EJS templates live in `plugins/airent/`:

- `api-next-tanstack/augmentor.js` — adds TanStack hook generation
- `api-next-tanstack/*.ts.ejs` — EJS templates for generating hook files
- `builder-augmentor.js` — additional field building logic
- `all-utils-template.ts.ejs` — generates `src/generated/utils.ts`

Custom API-Next plugins in `plugins/airent-api-next/`:

- `client-sdk-json-template.ts.ejs` — generates JSON API client
- `server-api-inngest-route-template.ts.ejs` — Inngest route wiring
- `server-service-inngest-template.ts.ejs` — Inngest service wiring
- `server-service-scheduler-template.ts.ejs` — Scheduler wiring

## Modifying Generated Behavior

To change how a generated file behaves without touching `src/generated/`:

1. **Change request/response shape** → Edit `src/common/types/data/{entity}.ts` and the YAML schema
2. **Change who can access the endpoint** → Edit `requireLogin` in the YAML schema
3. **Change what data is returned** → Edit `src/backend/services/data/{entity}.ts`
4. **Add computed fields** → Edit `src/backend/entities/{entity}.ts`
5. **Change template output** → Edit the relevant `.ejs` template in `plugins/`

## Common Pitfalls

- **Do not run `npm run airent` if you only changed service implementations** — it won't hurt, but it's unnecessary overhead.
- **Skippable templates** (marked `"skippable": true` in `airent.config.json`) will not overwrite existing files. This is how `src/backend/services/data/*.ts` is protected.
- **After adding a new entity**, the service file is generated once as a skeleton. You must fill in the actual Prisma queries.
- **If generation fails**, run `npm run pre-build` to do a full regeneration pass.
