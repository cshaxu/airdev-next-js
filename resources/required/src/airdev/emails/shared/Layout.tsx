/* "@airdev/next": "managed" */

import { airdevPublicConfig } from '@/airdev/config/public';
import { ReactNodeProps } from '@/airdev/frontend/types/props';
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

type Payload = ReactNodeProps & { preview: string; isBroadcast: boolean };

export default function Layout({ preview, isBroadcast, children }: Payload) {
  return (
    <Html>
      <Head>
        <style>
          {`
              .body {
                background-color: #ffffff;
              }
          `}
        </style>
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind
        config={{ theme: { extend: { fontSize: { base: ['1rem', '1.75'] } } } }}
      >
        <Body
          className="body px-2 py-10 text-neutral-900"
          style={{ fontFamily: '"Open Sans", Helvetica, Arial, sans-serif' }}
        >
          {children}
          <Container className="mt-10">
            {/* <Img
              src="/"
              alt={publicConfig.app.name}
              className="mx-auto"
              width={48}
              height={40}
            /> */}
            {isBroadcast && (
              <Text className="text-center">
                <Link
                  href={`${airdevPublicConfig.service.baseUrl}/notification-settings`}
                  className="text-neutral-500 underline"
                >
                  Notification Settings
                </Link>
              </Text>
            )}
            <Text className="text-center text-neutral-500">
              © {new Date().getFullYear()}{' '}
              <Link
                className="text-neutral-500 underline"
                href={airdevPublicConfig.service.baseUrl}
              >
                {airdevPublicConfig.app.owner}
              </Link>
              . All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
