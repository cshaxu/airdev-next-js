import { shellAdapter } from '@/adapter/frontend/shell';
import { withError } from '@/frontend/utils/page';

function Page() {
  const { AirentApiNextStudioComponent } = shellAdapter.component;
  return <AirentApiNextStudioComponent />;
}

const SafePage = withError(Page);
export default SafePage;
