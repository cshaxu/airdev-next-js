# Frontend Patterns

## Directory Overview

```
src/frontend/
├── components/
│   ├── ui/           # Radix-based UI primitives (Button, Dialog, Select, etc.)
│   └── ...           # Feature components
├── constants.ts      # Frontend constants
├── hooks/            # Custom React hooks
├── layout/           # Layout components
├── lib/              # Client-side utilities
├── providers/        # React context providers
├── sdks/             # Client-side SDK wrappers
├── stores/           # Zustand global stores
├── styles/
│   └── globals.css   # Tailwind CSS v4 global styles
├── types/            # Frontend-only TypeScript types
└── utils/            # Client utilities
```

## Data Fetching with TanStack Query

All server data fetching uses generated TanStack Query hooks from `src/generated/tanstack-hooks/`.

### Client Components

```typescript
'use client';
import {
  useGetManyChats,
  useGetOneChat,
  useCreateChat,
  useUpdateChat,
  useDeleteChat,
} from '@/generated/tanstack-hooks/chat-client';

// List query
function ChatList() {
  const { data, isLoading, error } = useGetManyChats({ take: 20 });
  if (isLoading) return <Spinner />;
  return data?.chats.map(chat => <ChatItem key={chat.id} chat={chat} />);
}

// Single item query
function ChatDetail({ chatId }: { chatId: string }) {
  const { data } = useGetOneChat({ id: chatId });
  return <div>{data?.chat.summary}</div>;
}

// Mutation
function CreateChatButton() {
  const { mutate, isPending } = useCreateChat({
    onSuccess: (data) => {
      router.push(`/chats/${data.chat.id}`);
    },
  });
  return (
    <button disabled={isPending} onClick={() => mutate({ body: {} })}>
      New Chat
    </button>
  );
}
```

### Server Components

```typescript
import { getManyChatsServer } from '@/generated/tanstack-hooks/chat-server';
// or for cached:
import { getManyChatsServerCached } from '@/generated/tanstack-hooks/chat-server-cached';

async function ChatListPage() {
  const { chats } = await getManyChatsServer({ take: 20 });
  return <ChatList chats={chats} />;
}
```

### Prefetching for Hydration

```typescript
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchGetManyChats } from '@/generated/tanstack-hooks/chat-server';

async function ChatPage() {
  const queryClient = new QueryClient();
  await prefetchGetManyChats(queryClient, { take: 20 });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatListClient />
    </HydrationBoundary>
  );
}
```

## State Management

### TanStack Query — Server/Async State

Use for: any data that comes from the API. Always prefer generated hooks.

Provider setup: `src/frontend/components/ReactQueryProvider.tsx`

### Zustand — Global Client State

Use for: UI state shared across many components (sidebar open/close, active filters, user preferences not yet persisted, etc.)

```typescript
// src/frontend/stores/ui-store.ts
import { create } from 'zustand';

interface UiStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
```

Usage:

```typescript
import { useUiStore } from '@/frontend/stores/ui-store';

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  // ...
}
```

### Jotai — Atomic/Local State

Use for: fine-grained state within a component subtree, derived state atoms, or state that doesn't need to be global.

```typescript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### nuqs — URL Search Params as State

Use for: filters, pagination, tabs — anything that should be shareable/bookmarkable via URL.

```typescript
import { useQueryState } from 'nuqs';

function SearchPage() {
  const [q, setQ] = useQueryState('q', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
  });
  // ...
}
```

## Forms with React Hook Form + Zod

Always use React Hook Form + Zod together. Define the schema in `src/common/types/` so it can be shared with backend validation.

```typescript
// src/common/types/data/chat.ts
import { z } from 'zod';
export const CreateChatBody = z.object({
  title: z.string().min(1, 'Title is required'),
});
export type CreateChatBodyType = z.infer<typeof CreateChatBody>;
```

```typescript
// Component
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateChatBody, CreateChatBodyType } from '@/common/types/data/chat';
import { useCreateChat } from '@/generated/tanstack-hooks/chat-client';

function CreateChatForm() {
  const form = useForm<CreateChatBodyType>({
    resolver: zodResolver(CreateChatBody),
    defaultValues: { title: '' },
  });

  const { mutate, isPending } = useCreateChat();

  const onSubmit = form.handleSubmit((data) => mutate({ body: data }));

  return (
    <form onSubmit={onSubmit}>
      <input {...form.register('title')} />
      {form.formState.errors.title && <p>{form.formState.errors.title.message}</p>}
      <button type="submit" disabled={isPending}>Create</button>
    </form>
  );
}
```

## UI Components

### Primitives (`src/frontend/components/ui/`)

These are thin wrappers around Radix UI with Tailwind styling. Use them instead of raw HTML elements:

- `Button` — primary, secondary, ghost, destructive variants
- `Dialog` — modal dialogs
- `DropdownMenu` — context menus
- `Select` — accessible select inputs
- `Tabs` — tab navigation
- `Tooltip` — hover tooltips
- `Checkbox` — accessible checkboxes
- `Avatar` — user avatars

### Tailwind CSS v4 Notes

This project uses **Tailwind CSS v4** which differs from v3:

- No `tailwind.config.js` — configured via PostCSS (`postcss.config.mjs`)
- CSS-first configuration in `src/frontend/styles/globals.css`
- `@theme` directive for custom design tokens
- Classes work the same way as v3 for most cases

```css
/* globals.css — customize theme here */
@import 'tailwindcss';

@theme {
  --color-brand: #3b82f6;
  --font-sans: 'Inter', sans-serif;
}
```

### Class Utilities

```typescript
import { cn } from '@/frontend/lib/utils';  // tailwind-merge + clsx

// Conditional classes
<div className={cn('base-classes', isActive && 'active-classes', className)} />
```

### Component Variant Pattern (CVA)

```typescript
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-button-classes', {
  variants: {
    variant: {
      default: 'bg-primary text-white',
      outline: 'border border-input',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
```

## Authentication in Frontend

### Accessing Session

```typescript
'use client';
import { useSession } from 'next-auth/react';

function UserMenu() {
  const { data: session, status } = useSession();
  if (status === 'loading') return <Spinner />;
  if (!session) return <SignInButton />;
  return <Avatar src={session.user.image} />;
}
```

### Server Component Session

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/backend/lib/nextauth';

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');
  return <Profile user={session.user} />;
}
```

### Protecting Routes

Protected routes are organized under `src/app/(protected)/`. The middleware (`src/middleware.ts`) adds the `x-url` header but does not enforce auth — auth checks happen in the layout/page server components.

## Real-time with Pusher

```typescript
'use client';
import { pusherClient } from '@/frontend/sdks/pusher';
import { useEffect } from 'react';

function ChatMessages({ chatId }: { chatId: string }) {
  useEffect(() => {
    const channel = pusherClient.subscribe(`chat-${chatId}`);
    channel.bind('new-message', (data: ChatMessage) => {
      // update local state
    });
    return () => {
      pusherClient.unsubscribe(`chat-${chatId}`);
    };
  }, [chatId]);
}
```

## AI Streaming

For LLM streaming responses, use Vercel AI SDK:

```typescript
'use client';
import { useChat } from '@ai-sdk/react';

function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/stream/get-bot-message-stream',
  });

  return (
    <div>
      {messages.map(m => <Message key={m.id} message={m} />)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}
```

## Notifications (Toasts)

Use `sonner` for toast notifications:

```typescript
import { toast } from 'sonner';

toast.success('Chat created!');
toast.error('Something went wrong.');
toast.promise(createChat(data), {
  loading: 'Creating...',
  success: 'Created!',
  error: 'Failed to create.',
});
```

## Data Tables

Use TanStack Table (`@tanstack/react-table`) for complex tables:

```typescript
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'createdAt', header: 'Created' },
];

function DataTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // render table...
}
```

## File Upload Pattern

```typescript
import { useDropzone } from 'react-dropzone';

function FileUploader({ onUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (files) => {
      // Get presigned URL from backend
      const { url, fields } = await jsonClient.createS3PresignedPost({ fileName: files[0].name });
      // Upload to S3
      const formData = new FormData();
      Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
      formData.append('file', files[0]);
      await fetch(url, { method: 'POST', body: formData });
      onUpload(/* S3 URL */);
    },
  });
  return <div {...getRootProps()}><input {...getInputProps()} /></div>;
}
```

## Analytics

PostHog is initialized in `src/frontend/components/PosthogInit.tsx` and available globally. Track events:

```typescript
import posthog from 'posthog-js';

posthog.capture('chat_created', { chatId: id });
```
