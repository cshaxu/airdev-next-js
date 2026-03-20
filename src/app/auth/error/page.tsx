'use client';

import { APP_NAME } from '@/common/config';
import { withError } from '@/frontend/utils/page';
import { parseAsString, useQueryState } from 'nuqs';

function Page() {
  const [error] = useQueryState('error', parseAsString);
  const isVerificationError = error === 'Verification';
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 space-x-2">
        <h1 className="text-2xl font-bold">Unable to sign in</h1>
        <img className="h-24 w-24" src="/logo.svg" alt={APP_NAME} />
        {isVerificationError && (
          <p className="px-6 text-lg">
            The verification code is no longer valid. It may have been used
            already or it may have expired. Please request a new verification
            code.
          </p>
        )}
        {!isVerificationError && (
          <p className="mx-3 text-lg">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}

const SafePage = withError(Page);
export default SafePage;
