import Terms, { buildMetadata } from '@/frontend/components/policy/Terms';
import { publicConfig } from '@airdev/next/common/config';

export function generateMetadata() {
  return buildMetadata();
}

export default function TermsPage() {
  const { name, email, mainUrl, owner, ownerShort } = publicConfig.app;
  return (
    <Terms
      name={name}
      email={email}
      mainUrl={mainUrl}
      owner={owner}
      ownerShort={ownerShort}
    />
  );
}
