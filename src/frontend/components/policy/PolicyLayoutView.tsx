import { ReactNodeProps } from '@airdev/next/frontend/types/props';

export default function PolicyLayoutView({ children }: ReactNodeProps) {
  return <main className="h-screen overflow-y-auto px-6 py-6">{children}</main>;
}
