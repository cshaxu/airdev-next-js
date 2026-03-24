import { ReactNodeProps } from '@/package/frontend/types/props';

export default function PolicyLayout({ children }: ReactNodeProps) {
  return <main className="h-screen overflow-y-auto px-6 py-6">{children}</main>;
}
