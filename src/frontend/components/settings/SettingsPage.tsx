import { withError } from '@/frontend/utils/page';
import SettingsView from './SettingsView';

async function Page() {
  return <SettingsView />;
}

export default withError(Page);
