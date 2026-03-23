import AdminPageView from '@airdev/next/frontend/components/admin/AdminPageView';
import { withError } from '@airdev/next/frontend/utils/page';

async function AdminPage() {
  return <AdminPageView />;
}

const SafeAdminPage = withError(AdminPage);
export default SafeAdminPage;
