# Tech Stack

## Framework & Runtime

| Package               | Version | Purpose                    |
| --------------------- | ------- | -------------------------- |
| `next`                | ^15.1.6 | App framework (App Router) |
| `react` / `react-dom` | ^19.0.0 | UI rendering               |
| `typescript`          | ^5.7.3  | Type safety                |

## Authentication

| Package                     | Version  | Purpose                                    |
| --------------------------- | -------- | ------------------------------------------ |
| `next-auth`                 | ^4.24.11 | Auth framework (Google OAuth + Email/Code) |
| `@next-auth/prisma-adapter` | ^1.0.7   | Persists sessions/accounts to DB           |

**Config location:** `src/backend/lib/nextauth/`

Key files:

- `index.ts` — assembles auth options
- `providers/google.ts` — Google OAuth
- `providers/code.ts` — passwordless email/code
- `callbacks.ts` — session and JWT lifecycle
- `adapter.ts` — Prisma adapter binding

Auth routes:

- `POST /api/auth/[...nextauth]` — NextAuth handler
- `POST /api/auth/become` — admin user impersonation
- `POST /api/auth/pusher` — Pusher channel auth

Custom pages: `/auth/signin`, `/auth/error`

## Database

| Package                 | Version | Purpose                        |
| ----------------------- | ------- | ------------------------------ |
| `prisma`                | ^6.3.1  | Schema management + migrations |
| `@prisma/client`        | ^6.3.1  | Generated DB client            |
| `prisma-dbml-generator` | ^0.12.0 | DBML documentation generation  |

**DB:** CockroachDB (distributed SQL, PostgreSQL-compatible)
**Schema:** `prisma/schema.prisma`
**Migrations:** `prisma/migrations/`
**Seed:** `prisma/seed.ts` — run via `npx prisma db seed`

## Code Generation (Airent)

| Package            | Source                           | Purpose                              |
| ------------------ | -------------------------------- | ------------------------------------ |
| `airent`           | github:cshaxu/airent-js          | Core code generator                  |
| `@airent/prisma`   | github:cshaxu/airent-prisma-js   | Prisma schema → Airent schemas       |
| `@airent/api`      | github:cshaxu/airent-api-js      | Service/client/dispatcher generation |
| `@airent/api-next` | github:cshaxu/airent-api-next-js | Next.js route handlers generation    |
| `@airdev/tool`     | github:cshaxu/airdev-tool-js     | Dev tooling (update, env management) |

**Config:** `airent.config.json`
**Input schemas:** `schemas/airent/*.yaml`
**Output:** `src/generated/` and `src/app/api/data/`

## Styling

| Package                       | Version | Purpose                                                 |
| ----------------------------- | ------- | ------------------------------------------------------- |
| `tailwindcss`                 | ^4.0.3  | Utility CSS (v4, PostCSS-based — no tailwind.config.js) |
| `@tailwindcss/postcss`        | ^4.0.3  | Tailwind v4 PostCSS plugin                              |
| `@tailwindcss/typography`     | ^0.5.16 | Prose styling                                           |
| `tailwind-merge`              | ^2.6.0  | Class merging utility                                   |
| `class-variance-authority`    | ^0.7.1  | Component variant patterns                              |
| `clsx`                        | ^2.1.1  | Conditional class names                                 |
| `prettier-plugin-tailwindcss` | ^0.6.11 | Auto-sort Tailwind classes                              |

**Global styles:** `src/frontend/styles/globals.css`
**No `tailwind.config.js`** — Tailwind v4 is configured via PostCSS (`postcss.config.mjs`).

## UI Components

| Package                  | Purpose                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| `@radix-ui/react-*`      | Accessible headless primitives (dialog, dropdown, select, tabs, tooltip, etc.) |
| `@heroicons/react`       | SVG icon set                                                                   |
| `lucide-react`           | Additional icons                                                               |
| `cmdk`                   | Command palette                                                                |
| `sonner`                 | Toast notifications                                                            |
| `input-otp`              | OTP input                                                                      |
| `react-resizable-panels` | Resizable layout panels                                                        |
| `next-themes`            | Dark/light mode                                                                |

UI component wrappers: `src/frontend/components/ui/`

## State Management

| Package                          | Version | Purpose                              |
| -------------------------------- | ------- | ------------------------------------ |
| `@tanstack/react-query`          | ^5.66.0 | Async server state (generated hooks) |
| `@tanstack/react-query-devtools` | ^5.66.0 | Query debugging                      |
| `@tanstack/react-table`          | ^8.21.2 | Data tables                          |
| `zustand`                        | ^5.0.3  | Global client state                  |
| `jotai`                          | ^2.12.2 | Atomic/local component state         |
| `nuqs`                           | ^2.3.2  | URL search params as state           |

## Forms & Validation

| Package               | Version                  | Purpose               |
| --------------------- | ------------------------ | --------------------- |
| `react-hook-form`     | ^7.54.2                  | Form state management |
| `zod`                 | ^3.24.1                  | Schema validation     |
| `@hookform/resolvers` | ^3.10.0                  | Zod/RHF integration   |
| `zschema`             | github:cshaxu/zschema-js | Extended Zod schemas  |

## AI / LLM

| Package          | Version                   | Purpose                       |
| ---------------- | ------------------------- | ----------------------------- |
| `openai`         | ^4.79.4                   | OpenAI API client             |
| `@ai-sdk/openai` | ^1.2.7                    | Vercel AI SDK OpenAI provider |
| `@ai-sdk/react`  | ^1.1.25                   | Vercel AI SDK React hooks     |
| `ai`             | ^4.2.5                    | Vercel AI SDK core            |
| `js-tiktoken`    | ^1.0.18                   | Token counting                |
| `convolet`       | github:cshaxu/convolet-js | Conversation management       |

## Background Jobs & Real-time

| Package     | Version    | Purpose                           |
| ----------- | ---------- | --------------------------------- |
| `inngest`   | ^3.30.0    | Background job orchestration      |
| `pusher`    | ^5.2.0     | Server-side WebSocket (real-time) |
| `pusher-js` | ^8.4.0-rc2 | Client-side WebSocket             |

## Search

| Package     | Version | Purpose                 |
| ----------- | ------- | ----------------------- |
| `typesense` | ^1.8.2  | Full-text search client |

## Email

| Package                   | Version     | Purpose                   |
| ------------------------- | ----------- | ------------------------- |
| `@react-email/components` | ^0.0.32     | Email template components |
| `@react-email/render`     | ^1.0.4      | Render emails to HTML     |
| `postmark`                | ^4.0.2      | Email delivery service    |
| `react-email`             | 3.0.6 (dev) | Email preview dev server  |

Preview emails: `npm run email` (starts on port 3600)

## File Storage & Media

| Package                         | Version  | Purpose                    |
| ------------------------------- | -------- | -------------------------- |
| `@aws-sdk/client-s3`            | ^3.732.0 | S3 file storage            |
| `@aws-sdk/s3-presigned-post`    | ^3.732.0 | S3 presigned uploads       |
| `@aws-sdk/s3-request-presigner` | ^3.758.0 | S3 presigned download URLs |
| `@aws-sdk/client-textract`      | ^3.888.0 | AWS document extraction    |
| `react-dropzone`                | ^14.3.5  | File drop UI               |
| `magic-bytes.js`                | ^1.12.1  | File type detection        |

## Analytics & Monitoring

| Package        | Version | Purpose            |
| -------------- | ------- | ------------------ |
| `posthog-js`   | ^1.96.1 | Frontend analytics |
| `posthog-node` | ^4.4.1  | Backend analytics  |

## Utilities

| Package               | Version                  | Purpose                           |
| --------------------- | ------------------------ | --------------------------------- |
| `date-fns`            | ^2.30.0                  | Date manipulation                 |
| `lodash-es`           | ^4.17.21                 | Utility functions (ESM)           |
| `databag`             | github:cshaxu/databag-js | Encrypted config management       |
| `yaml`                | ^2.8.0                   | YAML parsing (for Airent schemas) |
| `googleapis`          | ^150.0.1                 | Google APIs                       |
| `@slack/web-api`      | ^7.8.0                   | Slack integration                 |
| `xlsx`                | ^0.18.5                  | Excel file handling               |
| `unzipper`            | ^0.12.3                  | ZIP extraction                    |
| `http-errors`         | ^2.0.0                   | HTTP error utilities              |
| `eventsource-parser`  | ^1.1.2                   | SSE stream parsing                |
| `react-markdown`      | ^9.0.3                   | Markdown rendering                |
| `@react-pdf/renderer` | ^4.3.1                   | PDF generation                    |
| `@mantine/hooks`      | ^7.16.2                  | Utility React hooks               |

## Dev Tools

| Package    | Version | Purpose                             |
| ---------- | ------- | ----------------------------------- |
| `prettier` | ^3.4.2  | Code formatting                     |
| `eslint`   | ^9.19.0 | Linting                             |
| `knip`     | ^5.42.3 | Unused code detection               |
| `ts-node`  | ^10.9.1 | TypeScript execution (seed scripts) |
| `ejs`      | ^3.1.10 | Template engine (Airent templates)  |

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "es5",
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Path alias `@/` maps to `src/`.
