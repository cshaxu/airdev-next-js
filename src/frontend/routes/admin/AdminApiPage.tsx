import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { withError } from '@airdev/next/frontend/utils/page';

function AdminApiPage() {
  const { AirentApiNextStudioComponent } = shellAdapter.component;
  return <AirentApiNextStudioComponent />;
}

const SafeAdminApiPage = withError(AdminApiPage);
export default SafeAdminApiPage;
