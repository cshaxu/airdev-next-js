# Agent Handoff

This file is the single source of truth for onboarding a coding agent in this repo.

## Session Start

1. Read this file first.
2. Read:
   - `docs/technical/backend-patterns.md`
   - `docs/technical/frontend-patterns.md`
   - `docs/technical/airent.md`
   - `docs/technical/dev-workflow.md`
3. Inspect existing code near the target feature before editing.
4. Follow existing patterns over introducing new styles.

## Project Snapshot

- Framework: Next.js App Router + TypeScript (`strict`)
- Styling: Tailwind CSS v4 + Radix UI wrappers
- Data/API generation: Airent
- DB: CockroachDB + Prisma
- Async state: TanStack Query (generated hooks)
- Forms: React Hook Form + Zod

## Non-Negotiable Rules

1. Never manually edit generated files:
   - `src/generated/**`
   - `src/app/api/data/**`
2. Do not use raw Prisma directly in backend services unless file is explicitly exempted by lint rules.
3. For backend API/service code:
   - Use `Context` time (`context.time`) instead of `new Date()` where applicable.
   - Use logging helpers (`logInfo`, `logWarn`, etc.) over `console.*`.
   - Use HTTP errors (`createHttpError`) over `new Error` in server paths.
4. Use `@/` alias imports; avoid relative parent imports.
5. Prefer extending existing utilities/components over duplicating logic.

## Coding Style Baseline

- Functional-first design and small composable helpers
- Prefer immutability (`const`, pure transformations) unless existing pattern requires mutation
- Readability over cleverness
- Keep side effects isolated and explicit
- Keep functions focused and testable

## Backend Conventions

- Put business logic in `src/backend/services/data/*`
- Keep computed fields/hooks in `src/backend/entities/*`
- Access control patterns:
  - `selfOrThrow(...)` for self-only actions
  - `checkOwnerAccess(...)` for ownership checks
  - fallback `adminOrThrow(...)` when needed
- Follow `before*`, main action, `after*` hook structure used by existing services
- If adding/removing files in `jobs/*`, `webhooks/*`, or `debug/*`, run `npm run airent`

## Frontend Conventions

- App Router pages in `src/app/**`
- Protected pages: keep existing layout/patterns
- Wrap server pages with `withError(...)` where used
- Use generated TanStack hooks in `src/generated/tanstack-hooks/*` for server data
- Use UI primitives from `src/frontend/components/ui/*`
- Use `cn(...)` for class composition
- For shareable UI state in URL, use `nuqs`

## Domain Context

[Fill in: product name, core surfaces, key domain rules]

## Safe Change Workflow

1. Make minimal, focused changes.
2. If schema/generation-related inputs changed, run:
   - `npm run pre-build`
3. Before finishing:
   - `npm run format:fix`
   - `npm run build`
4. If needed:
   - `npm run lint`

## High-Risk Operations

Require explicit human approval:

- `devtool db migration deploy development`
- `devtool db migration deploy production`
- Destructive data operations

Always test DB and migration changes locally first.

## Suggested Task Log Template

Use this section for in-progress handoff between sessions:

- Current task:
- Branch:
- Files changed:
- Decisions made:
- Open questions:
- Next actions:
- Validation status (`format`, `lint`, `build`, tests):
