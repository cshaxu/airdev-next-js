# @airdev/next-js

Shared frontend, backend, common, and framework source for Airdev-style Next.js projects.

## Package Boundary

This package is internally self-contained. The only project-local imports it expects from the consuming app are under `@/config/*`.

Required host-side config modules currently include:

- `@/config/public`
- `@/config/private`
- `@/config/edge`
- `@/config/shell`
- `@/config/component/client`
- `@/config/component/server`
- `@/config/function/backend`
- `@/config/function/client`
- `@/config/function/common`
- `@/config/function/server`

## Source Layout

- `frontend/*`
- `backend/*`
- `common/*`
- `framework/*`

## Consumer Notes

- Keep the consuming app `@/*` alias pointing to the app `src/*` so package imports to `@/config/*` resolve into the host app.
- Use Next `transpilePackages` when consuming this package from a Next app.
- The package includes global CSS and font assets under `src/frontend/styles` and `src/frontend/fonts`.