import { APP_NAME } from '@/common/config';
import {
  BookOpen,
  BrainCircuit,
  MessageCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import Image from 'next/image';
import LandingGetStartedDialog from './LandingGetStartedDialog';

const highlights = [
  {
    title: 'Chat + Context Memory',
    description:
      'Talk to your assistant with persistent memory and context-aware responses.',
    icon: MessageCircle,
  },
  {
    title: 'Adaptive Workflows',
    description:
      'Stay focused with flows that prioritize your latest requests and goals.',
    icon: Target,
  },
  {
    title: 'Structured Workspace',
    description:
      'Keep conversations, generated content, and tasks in one streamlined interface.',
    icon: BookOpen,
  },
];

const steps = [
  {
    title: 'Start a Chat',
    description: 'Create your first workspace conversation in seconds.',
  },
  { title: 'Build Context', description: 'Add details and iterate quickly.' },
  {
    title: 'Ship Faster',
    description: 'Turn conversations into concrete output.',
  },
];

export default function LandingPageView() {
  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-gradient-to-b from-blue-50 via-sky-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-sky-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt={APP_NAME} width={36} height={36} />
            <span className="text-lg font-semibold tracking-tight">
              {APP_NAME}
            </span>
          </div>
          <LandingGetStartedDialog />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-16 md:px-8">
        <section className="grid items-center gap-10 pt-14 pb-12 md:grid-cols-2 md:pt-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-sm text-sky-700">
              <Sparkles className="size-4" />
              AI-powered workflow platform
            </div>
            <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">
              Work Faster With a Clean, Memory-Driven AI Workspace
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              Launch structured chats, keep context intact, and move from idea
              to shipped output without losing momentum.
            </p>
            <LandingGetStartedDialog triggerClassName="h-12 rounded-2xl px-6 text-base" />
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-sky-200/60 to-cyan-100/50 blur-2xl" />
            <div className="space-y-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-xl shadow-sky-100/60">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <BrainCircuit className="size-4 text-sky-600" />
                Session Snapshot
              </div>
              <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                <p className="text-sm text-slate-500">Current Focus</p>
                <p className="text-2xl font-semibold">
                  Product planning sprint
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-700">Tasks Closed</p>
                  <p className="text-xl font-semibold">8</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-sm text-amber-700">Pending</p>
                  <p className="text-xl font-semibold">2</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-8 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 inline-flex rounded-lg bg-sky-100 p-2 text-sky-700">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="py-8">
          <div className="rounded-3xl border border-sky-100 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              How It Works
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-sky-50/70 p-4">
                  <p className="text-sm font-medium text-sky-700">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
