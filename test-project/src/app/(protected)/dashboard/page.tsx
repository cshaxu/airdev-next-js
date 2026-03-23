import { withError } from '@/frontend/utils/page';
import Dashboard from './components/Dashboard';

async function Page() {
  return <Dashboard />;
}

const SafePage = withError(Page);
export default SafePage;
