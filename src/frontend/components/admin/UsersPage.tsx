import { withError } from '@/package/frontend/utils/page';
import UserSearch from './UserSearch';

function Page() {
  return <UserSearch />;
}

const SafePage = withError(Page);
export default SafePage;
