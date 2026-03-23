import { publicConfig } from '@airdev/next/common/config';
import SignInLayoutView from '@airdev/next/frontend/components/auth/SignInLayoutView';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';

export default function AuthSignInLayout({ children }: ReactNodeProps) {
  const { name, description } = publicConfig.app;

  return (
    <SignInLayoutView appName={name} appDescription={description}>
      {children}
    </SignInLayoutView>
  );
}
