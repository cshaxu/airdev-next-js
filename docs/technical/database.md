# Database Guide

## Overview

- **Database:** CockroachDB (distributed SQL, PostgreSQL-compatible)
- **ORM:** Prisma 6
- **Schema:** `prisma/schema.prisma`
- **Migrations:** `prisma/migrations/`
- **Seed script:** `prisma/seed.ts`

## WARNING

> **DANGEROUS operations require explicit user approval.**
>
> - `devtool db migration deploy development` — modifies the shared dev database
> - `devtool db migration deploy production` — modifies the production database
>
> Always test migrations locally first. If anything is wrong on development or production, stop immediately.

## Environments

| Environment   | DB Cluster          | When to use                               |
| ------------- | ------------------- | ----------------------------------------- |
| `local`       | Local CockroachDB   | Daily development, testing schema changes |
| `development` | Remote dev cluster  | After PR is merged to `main`              |
| `production`  | Remote prod cluster | After `production` branch is updated      |

Switch active environment:

```bash
devtool env set local        # current terminal session only
devtool env lock local       # all terminal sessions (persists)
```

## Everyday Commands

```bash
# Regenerate Prisma client after schema edits
npx prisma generate

# Seed local database
npx prisma db seed

# View local database in browser
devtool db view local

# View development database
devtool db view development

# View production database
devtool db view production

# Pull schema from remote (refresh local schema.prisma)
devtool db pull_schema
```

## Adding or Changing a Table Schema

### Step 1: Refresh Local Schema

Before editing, always pull the latest schema from remote to avoid conflicts:

```bash
devtool db pull_schema
```

### Step 2: Edit `prisma/schema.prisma`

Make your desired changes to the model definitions.

### Step 3: Update Prisma Client

```bash
npx prisma generate
```

### Step 4: Update Airent Schemas

After adding new columns, add them to the corresponding YAML file in `schemas/airent/`. Then run:

```bash
npm run pre-build
```

### Step 5: Generate Migration SQL

```bash
devtool db migration create <your-migration-name>
```

This generates a new migration file in `prisma/migrations/`. Review it carefully.

### Step 6: Test Locally

```bash
devtool db migration deploy local
```

Write your business logic that uses the new schema and verify it works.

### Step 7: Commit Schema Changes in Isolation

**Important:** Create a PR that contains ONLY the schema changes. Do not combine schema migrations with business logic changes. This makes rollbacks much simpler.

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "db: add <migration-name>"
```

### Step 8: Deploy to Development (after PR merges to main)

Once the schema PR is merged:

```bash
devtool db migration deploy development
```

Notify the team so they can run `npx prisma generate` if they connect to the development DB.

### Step 9: Deploy to Production

On the `production` branch:

```bash
devtool db migration deploy production
```

Refresh schema file:

```bash
devtool db pull_schema
```

Notify the team.

## Setting Up Local Database (First Time)

1. Install CockroachDB locally (follow CockroachDB docs for single-node setup)
2. Set the connection string in `.env.local`:
   ```
   BAREBONE_NEXT_DATABASE_URL=postgresql://root@localhost:26257/barebonedb?sslmode=disable
   ```
3. Deploy all migrations:
   ```bash
   devtool db migration deploy local
   ```
4. Seed the database:
   ```bash
   npx prisma db seed
   ```
5. If the local DB gets messed up:
   ```bash
   devtool local cockroach reset
   # Then go back to step 3
   ```

## Prisma Schema Notes

### Provider

```prisma
datasource db {
  provider = "cockroachdb"
  url      = env("BAREBONE_NEXT_DATABASE_URL")
}
```

### Generators

Two generators are configured:

- `@prisma/client` — the JavaScript client
- `prisma-dbml-generator` — outputs DBML to `prisma/dbml/` for documentation

### Model Conventions

- Primary key: `id String @id @default(cuid())`
- Timestamps: `createdAt DateTime @default(now())`, `updatedAt DateTime @updatedAt`
- Relations use the `@relation` attribute with explicit foreign key fields
- Cascade deletes defined at the Prisma level with `onDelete: Cascade`

## Existing Models

| Model                       | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| `User`                      | Application users                            |
| `Chat`                      | Chat conversations                           |
| `ChatMessage`               | Individual messages (content stored as JSON) |
| `ChatUser`                  | Chat participants (many-to-many join)        |
| `UserMemory`                | User preferences/metadata                    |
| `NextauthAccount`           | OAuth provider accounts                      |
| `NextauthSession`           | Active auth sessions                         |
| `NextauthVerificationToken` | Email verification tokens                    |
| `SystemRequestCache`        | Request deduplication cache                  |
| `SystemScheduledJob`        | Scheduled job tracking                       |

## Connection Troubleshooting

- Local connection refused: check CockroachDB is running (`cockroach start-single-node`)
- Schema mismatch errors: run `npx prisma generate` and `devtool db pull_schema`
- Migration conflicts: pull schema from remote before starting new migrations
