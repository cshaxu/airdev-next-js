'use client';

import { APP_NAME, APP_OWNER_SHORT } from '@/common/config';
import GoogleLogo from '@/frontend/components/logos/GoogleLogo';
import { Button } from '@/frontend/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/frontend/components/ui/Dialog';
import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  triggerClassName?: string;
};

export default function LandingGetStartedDialog({ triggerClassName }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          Get started
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[430px]">
        <DialogHeader>
          <DialogTitle>Welcome to {APP_NAME}</DialogTitle>
          <DialogDescription>
            Sign in to start using the workspace immediately.
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="outline"
          size="lg"
          className="h-12 rounded-2xl"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <GoogleLogo className="mr-2 size-5" />
          Continue with Google
        </Button>

        <small className="text-muted-foreground text-center text-xs leading-5">
          Powered by {APP_OWNER_SHORT}. By signing in, you agree to the{' '}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </small>
      </DialogContent>
    </Dialog>
  );
}
