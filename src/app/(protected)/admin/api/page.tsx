import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { withError } from '@airdev/next/frontend/utils/page';

function Page() {
  const { AirentApiNextStudioComponent } = shellAdapter.component;
  return <AirentApiNextStudioComponent />;
}

const SafePage = withError(Page);
export default SafePage;
