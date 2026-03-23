import { APP_OWNER, SERVICE_BASE_URL } from '@/common/config';
import { ReactNodeProps } from '@/frontend/types/props';
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';

type Payload = {
  preview: string;
  hasUnsubscribeLink?: boolean;
} & ReactNodeProps;

export default function Layout1({
  preview,
  children,
  hasUnsubscribeLink = false,
}: Payload) {
  return (
    <Html>
      <Head>
        <style>
          {`
              .body {
                background-color: #f5f5f5;
              }

              .main-container {
                border-radius: 24px;
                padding: 1rem;
              }

              @media (min-width: 640px) {
                .main-container {
                  padding: 2rem;
                }
              }
            `}
        </style>
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontSize: {
                base: ['1rem', '1.75'],
              },
            },
          },
        }}
      >
        <Body
          className="body px-2 py-10 text-neutral-900"
          style={{
            fontFamily: '"Open Sans", Helvetica, Arial, sans-serif',
          }}
        >
          <Container className="main-container mx-auto max-w-xl bg-white">
            {children}
          </Container>
          <Container className="mt-10">
            {hasUnsubscribeLink && (
              <Text className="text-center">
                <Link href="{{{ pm:unsubscribe }}}">Unsubscribe</Link>
              </Text>
            )}

            <Text className="text-center text-neutral-500">
              © {new Date().getFullYear()}{' '}
              <Link
                className="text-neutral-500 underline"
                href={SERVICE_BASE_URL}
              >
                {APP_OWNER}
              </Link>{' '}
              All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
