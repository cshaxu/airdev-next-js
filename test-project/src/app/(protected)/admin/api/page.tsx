import { withError } from '@/frontend/utils/page';

import AirentApiNextStudio from '@/generated/airent-api-next-studio';

async function Page() {
  return <AirentApiNextStudio />;
}

const SafePage = withError(Page);
export default SafePage;
