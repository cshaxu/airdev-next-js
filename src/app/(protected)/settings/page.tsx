import { withError } from '@/frontend/utils/page';
import Settings from './components/Settings';

async function Page() {
  return <Settings />;
}

const SafePage = withError(Page);
export default SafePage;
