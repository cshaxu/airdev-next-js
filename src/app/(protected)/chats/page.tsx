import { withError } from '@/frontend/utils/page';
import Chats from './components/Chats';

async function Page() {
  return <Chats />;
}

const SafePage = withError(Page);
export default SafePage;
