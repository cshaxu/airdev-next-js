import RootLayout, {
  generateRootLayoutMetadata,
} from '@airdev/next/frontend/components/shell/RootLayout';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';

export const generateMetadata = generateRootLayoutMetadata;

export default async function Layout({ children }: ReactNodeProps) {
  return <RootLayout>{children}</RootLayout>;
}
