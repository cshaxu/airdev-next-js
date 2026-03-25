# @airdev/next

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

The shared frontend currently expects these `shellConfig` fields:

- `routes.rootHref`
- `routes.homeHref`
- `routes.termsHref`
- `routes.privacyHref`
- `assets.logoSrc`
- `assets.iconSrc`
- `manifest.categories`

The shared auth sign-in illustrations are bundled inside this package, so consuming apps do not need to add the auth artwork files to their own `public/` folders.

The shared frontend also expects:

- `publicConfig.app.welcomeText`

The package hard-codes these shared route constants and does not read them from the consuming app config:

- `/auth`
- `/auth/signin`
- `/auth/error`
- `/admin`
- `/settings`

## Source Layout

- `frontend/*`
- `backend/*`
- `common/*`
- `framework/*`

## Consumer Notes

- Keep the consuming app `@/*` alias pointing to the app `src/*` so package imports to `@/config/*` resolve into the host app.
- Use Next `transpilePackages` when consuming this package from a Next app.
- The package includes global CSS and font assets under `src/frontend/styles` and `src/frontend/fonts`.
