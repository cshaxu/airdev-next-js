/* "@airdev/next": "managed" */

import { publicAppConfig } from '@/config/public-app';
import { Heading, Row, Section, Text } from '@react-email/components';
import Container from './shared/Container';
import Layout from './shared/Layout';
import Logo from './shared/Logo';

type Props = { subject: string; code: string };

export default function VerificationCode({ subject, code }: Props) {
  return (
    <Layout preview={subject} isBroadcast={false}>
      <Container>
        <Section className="text-center">
          <Logo
            src={publicAppConfig.app.logoUrl}
            alt={publicAppConfig.app.name}
          />
          <Row className="mb-3">
            <Heading as="h1" className="text-3xl font-medium tracking-tighter">
              {code}
            </Heading>
            <Text className="text-lg font-medium tracking-tight">
              is your {publicAppConfig.app.name} sign-in code. This code expires
              in 15 minutes.
            </Text>
            <Text className="text-sm font-medium tracking-tight text-neutral-500">
              Ignore this email if you didn&lsquo;t attempt to sign in.
            </Text>
          </Row>
        </Section>
      </Container>
    </Layout>
  );
}
