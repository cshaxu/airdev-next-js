/* "@airdev/next": "seeded" */

import { withError } from '@/airdev/frontend/utils/page';
import Dashboard from './components/Dashboard';

async function Page() {
  return <Dashboard />;
}

const SafePage = withError(Page);
export default SafePage;
