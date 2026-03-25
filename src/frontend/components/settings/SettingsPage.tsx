import { withError } from '@/frontend/utils/page';
import SettingsView from './Settings';

async function Page() {
  return <SettingsView />;
}

export default withError(Page);
