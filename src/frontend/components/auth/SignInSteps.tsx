'use client';

import type { CreateOneNextauthVerificationTokenBody } from '@airdev/next/adapter/frontend/query/types';
import type { UseMutationResult } from '@tanstack/react-query';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import SignInStart from './SignInStart';
import SignInVerify from './SignInVerify';

type Props = {
  appName: string;
  defaultCallbackUrl: string;
  homeHref: string;
  ownerShort: string;
  privacyHref: string;
  termsHref: string;
  useCreateOneNextauthVerificationToken: () => UseMutationResult<
    unknown,
    Error,
    CreateOneNextauthVerificationTokenBody
  >;
  verificationCodeLength: number;
};

export default function SignInSteps({
  appName,
  defaultCallbackUrl,
  homeHref,
  ownerShort,
  privacyHref,
  termsHref,
  useCreateOneNextauthVerificationToken,
  verificationCodeLength,
}: Props) {
  const [step] = useQueryState('step', parseAsString.withDefault('1'));
  const [email, setEmail] = useState<string>();

  if (step === '1' || email === undefined) {
    return (
      <SignInStart
        appName={appName}
        homeHref={homeHref}
        ownerShort={ownerShort}
        privacyHref={privacyHref}
        setEmail={setEmail}
        termsHref={termsHref}
        useCreateOneNextauthVerificationToken={
          useCreateOneNextauthVerificationToken
        }
      />
    );
  }

  if (step === '2') {
    return (
      <SignInVerify
        defaultCallbackUrl={defaultCallbackUrl}
        email={email}
        useCreateOneNextauthVerificationToken={
          useCreateOneNextauthVerificationToken
        }
        verificationCodeLength={verificationCodeLength}
      />
    );
  }

  return null;
}
