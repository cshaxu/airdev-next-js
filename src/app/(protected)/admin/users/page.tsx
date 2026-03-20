import { withError } from '@/frontend/utils/page';
import UserSearch from './components/UserSearch';

function Page() {
  return <UserSearch />;
}

const SafePage = withError(Page);
export default SafePage;
