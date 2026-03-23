'use client';

import { clientQueryAdapter } from '@airdev/next/adapter/frontend/query';
import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { publicConfig } from '@airdev/next/common/config';
import SignInSteps from '@airdev/next/frontend/components/auth/SignInSteps';

export default function SignInStepsClient() {
  return (
    <SignInSteps
      appName={publicConfig.app.name}
      defaultCallbackUrl={shellAdapter.navigation.homeHref}
      homeHref={shellAdapter.navigation.homeHref}
      ownerShort={publicConfig.app.ownerShort}
      privacyHref={shellAdapter.navigation.privacyHref}
      termsHref={shellAdapter.navigation.termsHref}
      useCreateOneNextauthVerificationToken={
        clientQueryAdapter.useCreateOneNextauthVerificationToken
      }
      verificationCodeLength={publicConfig.auth.verificationCodeLength}
    />
  );
}
