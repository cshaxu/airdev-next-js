import PolicyLayoutView from '@airdev/next/frontend/components/policy/PolicyLayoutView';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';

export default function PolicyLayout({ children }: ReactNodeProps) {
  return <PolicyLayoutView>{children}</PolicyLayoutView>;
}
