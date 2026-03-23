import { publicConfig } from '@airdev/next/common/config';
import Privacy, {
  buildMetadata,
} from '@airdev/next/frontend/components/policy/Privacy';

export function generateMetadata() {
  return buildMetadata(publicConfig.app.name);
}

export default function PrivacyPage() {
  const { email, mainUrl, owner, ownerShort } = publicConfig.app;
  return (
    <Privacy
      email={email}
      mainUrl={mainUrl}
      owner={owner}
      ownerShort={ownerShort}
    />
  );
}
