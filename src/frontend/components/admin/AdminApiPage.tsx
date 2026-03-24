import { serverComponentConfig } from '@/config/component/server';
import { withError } from '@/package/frontend/utils/page';

async function Page() {
  const { AdminApiPage } = serverComponentConfig;
  return <AdminApiPage />;
}

const SafePage = withError(Page);
export default SafePage;
