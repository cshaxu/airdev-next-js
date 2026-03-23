'use client';

import type { CreateOneNextauthVerificationTokenBody } from '@airdev/next/adapter/frontend/query/types';
import { Button } from '@airdev/next/frontend/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@airdev/next/frontend/components/ui/Form';
import { Input } from '@airdev/next/frontend/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutationResult } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GoogleLogo from './GoogleLogo';

type Props = {
  appName: string;
  homeHref: string;
  ownerShort: string;
  privacyHref: string;
  setEmail: (email: string) => void;
  termsHref: string;
  useCreateOneNextauthVerificationToken: () => UseMutationResult<
    unknown,
    Error,
    CreateOneNextauthVerificationTokenBody
  >;
};

const formSchema = z.object({ email: z.string().email() });
type FormSchema = z.infer<typeof formSchema>;

export default function SignInStart({
  appName,
  homeHref,
  ownerShort,
  privacyHref,
  setEmail,
  termsHref,
  useCreateOneNextauthVerificationToken,
}: Props) {
  const [_, setStep] = useQueryState('step');
  const [next] = useQueryState('next', parseAsString);
  const { mutate: createVerificationToken, isPending } =
    useCreateOneNextauthVerificationToken();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(data: FormSchema) {
    const { email } = data;
    setEmail(email);
    createVerificationToken(
      { email },
      {
        onSuccess: () => {
          void setStep('2');
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h3 className="text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl">
        Welcome to {appName}
      </h3>
      <Button
        variant="outline"
        size="lg"
        className="flex h-12 w-full items-center gap-2 rounded-[12px] px-4 sm:h-11 [&_svg]:size-5"
        onClick={() =>
          void signIn('google', {
            callbackUrl: next || homeHref,
          })
        }
        type="button"
      >
        <GoogleLogo />
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <hr className="border-border w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background text-muted-foreground px-2 text-sm">
            or
          </span>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    scale="lg"
                    className="rounded-[12px]"
                    placeholder="Enter your email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            isLoading={isPending}
            className="h-12 rounded-[12px] sm:h-11"
          >
            Continue with Email
          </Button>
          <small className="text-muted-foreground mx-auto block w-full max-w-sm text-center text-xs leading-5">
            Powered by {ownerShort}. By signing up, you agree to the{' '}
            <Link href={termsHref} prefetch={false} className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={privacyHref} prefetch={false} className="underline">
              Privacy Policy
            </Link>
            , including Cookie Use.
          </small>
        </form>
      </Form>
    </div>
  );
}
