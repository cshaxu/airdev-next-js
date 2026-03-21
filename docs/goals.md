# Project Goals

## Primary Goal

Turn `airdev-next-js` into a reusable package, `@airdev/next`, for shared Next
app infrastructure.

This package is not meant to own application business logic. It exists to
centralize the common layer used across apps with the same overall product and
runtime shape.

## What The Package Should Provide

- shared adapters and adapter types
- bootstrap or initialization wiring for package-owned integration points
- shared auth flow orchestration
- shared shell/navigation contracts
- shared frontend/backend utilities and hooks
- shared UI and page-level building blocks where they are generic enough
- a stable package boundary for consumer apps

## What Consumer Apps Should Still Own

- Prisma and database schema
- Airent entities and service logic
- generated API clients, generated TanStack hooks, and generated model types
- business-level routes, features, and workflows
- app-specific configuration, branding, and navigation data

## Testing Goal

The package should be testable without publishing to or booting
`barebone-next`.

To support that:

- this repo will include a local mock consumer app, `test-project/`
- `test-project/` will consume `@airdev/next` through package exports
- `test-project/` will provide fake adapter implementations and fake query-hook
  implementations
- `barebone-next` remains the real external integration check

## Success Criteria

The package is in a good state when:

- the package builds as a shareable library
- `test-project/` can run and build against package exports
- `barebone-next` can consume the package with minimal local framework code
- package-owned behavior is no longer duplicated across consumer apps
