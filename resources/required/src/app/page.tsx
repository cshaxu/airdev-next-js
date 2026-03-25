import RootPage, {
  generateRootPageMetadata,
} from '@airdev/next/frontend/components/shell/RootPage';

export const dynamic = 'force-dynamic';
export const generateMetadata = generateRootPageMetadata;
export default RootPage;
