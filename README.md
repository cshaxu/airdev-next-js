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

The app-level Next entrypoint file `src/proxy.ts` can be a thin wrapper around the shared package module:

```ts
export { config, proxy } from '@airdev/next/frontend/proxy';
```

## Source Layout

- `frontend/*`
- `backend/*`
- `common/*`
- `framework/*`

## Consumer Notes

- Keep the consuming app `@/*` alias pointing to the app `src/*` so package imports to `@/config/*` resolve into the host app.
- Use Next `transpilePackages` when consuming this package from a Next app.
- The package includes global CSS and font assets under `src/frontend/styles` and `src/frontend/fonts`.

## Route Generation

This package includes a root scaffold generator that copies the contents of `resources/root` into a consuming app.

From a consuming app root:

```bash
airdev-next generate root --check
airdev-next generate root
```

The copied files currently include package-owned thin wrappers and shared project config like:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/loading.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/app/manifest.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/(policy)/layout.tsx`
- `src/app/(policy)/privacy/page.tsx`
- `src/app/(policy)/terms/page.tsx`
- `src/app/auth/error/page.tsx`
- `src/app/auth/signin/layout.tsx`
- `src/app/auth/signin/page.tsx`
- `src/app/(protected)/layout.tsx`
- `src/app/(protected)/not-found.tsx`
- `src/app/(protected)/admin/layout.tsx`
- `src/app/(protected)/admin/page.tsx`
- `src/app/(protected)/admin/api/page.tsx`
- `src/app/(protected)/admin/users/page.tsx`
- `src/app/(protected)/settings/page.tsx`
- `src/app/(protected)/settings/loading.tsx`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/api/auth/become/route.ts`
- `src/proxy.ts`
- `next.config.js`
- `tsconfig.json`
- `components.json`
- `plugins/airent-api-next/*`

The generator performs a straight 1:1 copy from `resources/root` into the consumer app root and overwrites existing files to match the package resources. Use `--check` to report drift without writing.
