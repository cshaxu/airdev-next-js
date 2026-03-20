'use client';

import { withError } from '@/frontend/utils/page';
import { getAuthFrontendIntegration } from '@/integration/frontend/auth';
import { parseAsString, useQueryState } from 'nuqs';

function Page() {
  const [error] = useQueryState('error', parseAsString);
  const authIntegration = getAuthFrontendIntegration();
  const viewModel = authIntegration.getErrorViewModel(error);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 space-x-2">
        <h1 className="text-2xl font-bold">{viewModel.title}</h1>
        {authIntegration.branding.heroLogoSrc && (
          <img
            className="h-24 w-24"
            src={authIntegration.branding.heroLogoSrc}
            alt={authIntegration.branding.appName}
          />
        )}
        <p className="mx-3 text-center text-lg">{viewModel.description}</p>
      </div>
    </div>
  );
}

const SafePage = withError(Page);
export default SafePage;
