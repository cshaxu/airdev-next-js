# Migration Plan

## Goal

Reshape this repo into three clear layers:

1. `src/`: package source for `@airdev/next`
2. `lib/`: built package artifact
3. `test-project/`: runnable Next.js app that consumes `lib/`

`barebone-next` remains the real external consumer after the in-repo migration
is stable.

## Source Of Truth Rule

During migration, `test-project` behavior is the source of truth.

That means:

1. find the currently working logic in `test-project`
2. compare it with the corresponding code in `src`
3. if behavior differs, patch `src` first
4. only then switch `test-project` to consume the package build

This is a behavior-preserving extraction, not a blind replacement of app code
with package code.

## Non-Goals

Do not optimize for full `barebone-next` feature parity inside `test-project`.

`test-project` should only keep the package-covered core:

- auth
- protected shell
- settings
- admin users
- policy pages
- shared layout/providers/config wiring

Everything else should be removed unless it is needed to test package behavior.

## Target End State

### `src/`

Pure package/lib code only:

- no mock runtime defaults required to boot a Next app
- no Prisma ownership
- no generated entity/service ownership
- no app-specific external SDK wiring
- explicit adapters and shared orchestration only

### `lib/`

Generated build artifact:

- emitted JS
- emitted `.d.ts`
- explicit entrypoints
- the only thing `test-project` consumes from the package

### `test-project/`

Runnable consumer app:

- imports from `lib/`
- owns mock config and mock adapters
- owns route assembly
- uses in-memory/mock implementations for DB and external effects
- contains only the package-supported app surface

## Working Rules

### Rule 1: Compare Before Rewiring

For every shared slice:

- inspect `test-project`
- inspect `src`
- reconcile behavior in `src`
- build `lib`
- rewire `test-project`
- verify

### Rule 2: Delete Large Features Early

If a `test-project` feature is outside the package scope, delete it instead of
mocking its entire backend stack.

Examples likely to delete:

- chats
- dashboard
- generated `/api/data/*`
- debug routes
- edge routes
- inngest/jobs
- stream/json/webhook endpoints
- external AI/search integrations

### Rule 3: Move Defaults Out Of Package Runtime

Mock data and default settings should live in `test-project`, not in package
runtime code.

Package bootstrap should not remain the runtime testing story.

### Rule 4: Enforce The Boundary With `lib/`

`test-project` must consume built output from `lib/`, not `src/` directly.

That is what validates:

- exports
- type emission
- internal path discipline
- package/public API boundaries

## Phase 1: Build Boundary

Goal:

- make `src -> lib` a real package build step

Tasks:

- add package build config that emits JS and `.d.ts` into `lib/`
- define explicit package entrypoints
- remove reliance on source-only import assumptions
- make `test-project` capable of importing from `lib/`

Done when:

- `lib/` is generated reliably
- `test-project` can import package code from `lib/`
- package internals are no longer consumed accidentally

## Phase 2: Scope `test-project`

Goal:

- reduce `test-project` to the package-supported surface

Keep:

- root app layout
- auth pages
- protected shell
- settings
- admin users
- policy pages
- minimal shared providers/config

Delete:

- `test-project/prisma`
- `test-project/prisma.config.ts`
- `test-project/src/generated`
- `test-project/src/backend/entities`
- `test-project/src/backend/services`
- `test-project/src/app/api/data`
- chats/dashboard product features
- debug/edge/inngest/jobs/json/stream/webhooks not needed by package core
- emails/plugins/schemas/scripts not needed for package testing

Done when:

- `test-project` contains only package-core flows
- Prisma and Airent generation are no longer required to start it

## Phase 3: Add Test-Project Wiring

Goal:

- make `test-project` the owner of mock runtime values and adapter wiring

Add a local wiring layer, for example:

- `test-project/src/wiring/config.ts`
- `test-project/src/wiring/backend/data.ts`
- `test-project/src/wiring/backend/nextauth.ts`
- `test-project/src/wiring/frontend/api.ts`
- `test-project/src/wiring/frontend/query.ts`
- `test-project/src/wiring/frontend/shell.ts`

Those files should provide:

- in-memory user/session/account/token/cache data
- fake query hooks
- fake API client responses
- app config values
- shell/navigation config
- no-op or fake external effect handlers

Done when:

- `test-project` can boot without Prisma, DB schema, or external services
- all required package adapters are supplied by local wiring

## Phase 4: Migrate Shared Core Slices

Goal:

- move `test-project` shared logic to package consumption slice by slice

Recommended order:

1. config
2. shell/navigation
3. root layout/providers
4. framework/current-user resolution
5. auth runtime and auth pages
6. settings
7. admin users
8. policy pages

For each slice:

1. inspect current `test-project` behavior
2. compare with `src`
3. patch `src` if behavior differs
4. build `lib`
5. rewire `test-project` to consume `lib`
6. verify behavior manually and with compile/build

Done when:

- `test-project` imports package-built code for the retained shared surface
- duplicated local logic is removed

## Phase 5: Remove Package Bootstrap As Runtime Fallback

Goal:

- stop depending on package bootstraps to make the app runnable

Tasks:

- move mock/default runtime values into `test-project`
- make required package integrations explicit
- reduce or remove fake package bootstrap behavior
- prefer fail-fast behavior in package runtime where appropriate

Done when:

- package runtime no longer pretends to be a standalone app
- `test-project` is the local runnable app

## Phase 6: Verification

Goal:

- prove the migration is stable before touching `barebone-next`

Minimum checks:

- package build succeeds
- `test-project` typechecks
- `test-project` builds
- auth flow works
- protected shell renders
- settings flow works
- admin users flow works

Only after this should `barebone-next` begin consuming the package.

## Slice Notes

### Config

Source of truth:

- `test-project/public.config.json`
- `test-project/private.config.json`
- `test-project/src/common/config.ts`
- `test-project/src/backend/config.ts`

Package work:

- keep config access abstract
- make `test-project` provide the values
- remove package dependence on bootstrap defaults for runtime

### Framework / Current User

Source of truth:

- `test-project/src/backend/lib/framework.ts`

Package work:

- keep package framework orchestration
- ensure adapter-driven behavior matches `test-project`
- keep request-cache semantics aligned

### Auth

Source of truth:

- `test-project/src/backend/lib/nextauth/*`
- `test-project/src/app/auth/*`

Package work:

- package owns shared auth orchestration and UI
- `test-project` provides mock nextauth/data dependencies
- if callback/provider/page behavior differs, patch package first

### Settings / Admin Users

Source of truth:

- `test-project/src/app/(protected)/settings/*`
- `test-project/src/app/(protected)/admin/users/*`

Package work:

- package should expose the shared flows/hooks/components
- `test-project` should supply query/data behavior through adapters

## Deliverables

### First deliverable

- package build to `lib/`
- `test-project` reduced to package-core routes only

### Second deliverable

- local adapter wiring in `test-project`
- no Prisma requirement
- no external API requirement

### Third deliverable

- `test-project` consumes `lib/` for the shared core
- package bootstrap no longer carries the local app runtime

## Success Criteria

The migration is successful when:

- `src/` is clearly package-only
- `lib/` is the enforced package boundary
- `test-project/` is the runnable browser-test app
- `test-project` no longer requires Prisma or real external services
- package behavior matches the previously working `test-project` behavior for
  the retained shared core
