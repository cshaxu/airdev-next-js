import { withError } from '@/frontend/utils/page';
import { getAdminFrontendIntegration } from '@/integration/frontend/admin';

function Page() {
  const { StudioComponent } = getAdminFrontendIntegration();
  return <StudioComponent />;
}

const SafePage = withError(Page);
export default SafePage;
