import { withError } from '@/frontend/utils/page';

function Page() {
  return <div className="h-full" />;
}

const SafePage = withError(Page);
export default SafePage;
