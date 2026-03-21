# Principles

## 1. Package Owns Shape, Consumer Owns Implementation

`@airdev/next` should define contracts, orchestration, and reusable shared UI.
Consumer apps should supply implementation where the logic is tied to business
data or persistence.

Examples:

- package owns `ClientQueryAdapter` types
- consumer app provides generated TanStack hooks that satisfy them
- package owns auth orchestration
- consumer app provides Prisma-backed auth persistence where needed

## 2. Do Not Pull Business Models Into The Package

The package should not become the owner of generated hooks, Prisma models, or
Airent entities.

That includes:

- no package-owned generated TanStack layer for consumer business models
- no package-owned Prisma client
- no package-owned data services for app-specific models

## 3. Prefer Injection Over Hidden Coupling

If package behavior depends on app-specific runtime details, that dependency
should be expressed through adapters or package initialization, not through
implicit imports from consumer code.

## 4. Keep Package Boundaries Honest

The local test app must consume the package through published-style imports,
not through direct relative imports into source internals.

Good:

- `import { setClientQueryAdapter } from '@airdev/next'`

Bad:

- `import { setClientQueryAdapter } from '../../src/adapter/...`

## 5. Keep Shared Orchestration In The Package

When behavior is shared and can be implemented from lower-level injected
dependencies, the package should own that behavior.

Examples:

- auth page flow
- current-user convenience hooks
- protected shell behavior
- shared settings/admin interaction patterns

## 6. Keep Route Ownership Conservative

Consumer apps should usually own their `src/app/**` route tree.

The package may export:

- components
- layouts
- providers
- route helpers
- page sections

But the package should not assume it owns all route files in the consumer app.

## 7. Fail Fast Where Possible

Bootstrap defaults are useful during extraction and in the mock test app, but
the long-term package runtime should prefer explicit wiring and clear failures
over silent no-op behavior.

## 8. Optimize For Two Consumers

The package must work well in two environments:

- `test-project/`: fast local mock consumer
- `barebone-next`: real external app consumer

If a design only works in the source repo but breaks at a package boundary, it
is not a valid package design.
