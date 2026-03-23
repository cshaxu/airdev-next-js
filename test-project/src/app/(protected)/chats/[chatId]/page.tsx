import { withError } from '@/frontend/utils/page';
import ChatSession from './components/ChatSession';

type Props = {
  params: Promise<{ chatId: string }>;
};

async function Page({ params }: Props) {
  const { chatId } = await params;
  return <ChatSession chatId={chatId} />;
}

const SafePage = withError(Page);
export default SafePage;
