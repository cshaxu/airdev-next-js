/* "@airdev/next": "managed" */

import { withError } from '@/airdev/frontend/utils/page';
import { serverComponentConfig } from '@/config/component/server';

async function Page() {
  const { AdminApiPage } = serverComponentConfig;
  return <AdminApiPage />;
}

const SafePage = withError(Page);
export default SafePage;
