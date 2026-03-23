import SignInLayoutView from '@/frontend/components/auth/SignInLayoutView';
import { publicConfig } from '@airdev/next/common/config';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';

export default function AuthSignInLayout({ children }: ReactNodeProps) {
  const { name, description } = publicConfig.app;

  return (
    <SignInLayoutView appName={name} appDescription={description}>
      {children}
    </SignInLayoutView>
  );
}
