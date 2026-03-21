# Folder Structure

## Target Repository Model

This repo should evolve toward the following structure:

```text
airdev-next-js/
  package.json
  src/
  docs/
  test-project/
```

Where:

- repo root is the package workspace
- `src/` contains package code only
- `docs/` contains package goals, principles, structure, milestones, and
  supporting technical notes
- `test-project/` is a small local consumer app used to test the package

## Package Code

Package code should live under `src/` and stay focused on shared
infrastructure.

Current shared areas that fit this model:

- `src/adapter`
- `src/bootstrap`
- `src/backend`
- `src/frontend`
- `src/common`
- `src/framework`

These areas should be treated as package code, not app-specific code.

## Test Project

`test-project/` should be a minimal Next app that:

- depends on `@airdev/next`
- configures package adapters with fake implementations
- provides fake query-hook implementations matching consumer-app contracts
- exercises shared auth, shell, settings, and admin flows
- can run `next dev` and `next build` quickly

It exists to test package behavior and package boundaries inside this repo.

## External Consumer

`barebone-next` is the real external consumer.

It should own:

- Prisma
- Airent schemas/entities/services
- generated clients/hooks/types
- app-specific pages and business features

It should import `@airdev/next` for shared infrastructure rather than copying
that infrastructure locally.

## Route Ownership

Near-term rule:

- keep most consumer route files in the consumer app
- export reusable components and wiring helpers from the package

Possible package exports:

- auth screen components
- protected-layout building blocks
- shell UI
- settings/admin shared sections
- providers and hooks

Less likely package exports:

- full consumer-specific route trees
- business-specific dashboards and data pages

## Package Entry Points

The package should eventually expose explicit entry points rather than a broad
implicit source tree.

Likely examples:

- `@airdev/next`
- `@airdev/next/adapter`
- `@airdev/next/frontend`
- `@airdev/next/backend`
- `@airdev/next/common`

## Build Direction

The repo currently behaves like a Next app. It should be reshaped so the root
package can build distributable JS and type declarations for consumers.

That implies:

- explicit package exports
- emitted library output
- peer dependency clarity
- reduced reliance on source-only alias assumptions
