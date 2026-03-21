# Milestones

## Milestone 1: Lock The Boundary

Goal:

- agree on what `@airdev/next` owns vs what consumer apps own

Definition of done:

- docs reflect the package boundary accurately
- adapter surfaces are named and intentional
- generated hooks remain consumer-owned
- Prisma and data services remain consumer-owned

## Milestone 2: Define Package API

Goal:

- decide the initial public package entry points

Definition of done:

- explicit export surface is listed
- internal-only code is distinguished from package API
- consumer wiring story is documented

Key tasks:

- add top-level package entry files
- choose subpath exports
- remove or avoid accidental public barrels

## Milestone 3: Add Package Initialization

Goal:

- make package configuration explicit and easy for consumers

Definition of done:

- adapter setup can happen through one clear package entry point or small set of
  stable registration calls
- shared package behavior does not require hidden app-specific imports

## Milestone 4: Create `test-project/`

Goal:

- add a fast local consumer app for package testing

Definition of done:

- `test-project/` imports `@airdev/next` as a package
- fake adapters and fake query hooks are wired in
- the app can run shared flows with mock data
- `next build` succeeds inside the test app

## Milestone 5: Package Build And Exports

Goal:

- make the repo build as a real shared package

Definition of done:

- package is no longer root-private in spirit
- JS and type output are emitted
- `exports` are defined
- consumers do not rely on package source internals

## Milestone 6: Adopt In `barebone-next`

Goal:

- make `barebone-next` the first real external consumer

Definition of done:

- shared shell/auth/query infrastructure imports come from `@airdev/next`
- duplicated framework code is removed from `barebone-next`
- Prisma, entities, generated hooks, and business logic remain local to
  `barebone-next`

## Milestone 7: Tighten Runtime Behavior

Goal:

- reduce extraction-era fake defaults in real package usage

Definition of done:

- package runtime fails clearly when required integrations are missing
- mock behavior is isolated to test/dev-friendly layers
- consumer expectations are documented
