'use client';

import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { publicConfig } from '@airdev/next/common/config';
import AuthError from '@airdev/next/frontend/components/auth/AuthError';
import { withError } from '@airdev/next/frontend/utils/page';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AuthErrorPageContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const isVerificationError = error === 'Verification';

  return (
    <AuthError
      appName={publicConfig.app.name}
      isVerificationError={isVerificationError}
      logoSrc={shellAdapter.component.logoSrc}
    />
  );
}

function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorPageContent />
    </Suspense>
  );
}

const SafeAuthErrorPage = withError(AuthErrorPage);
export default SafeAuthErrorPage;
