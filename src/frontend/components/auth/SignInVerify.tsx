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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@airdev/next/frontend/components/ui/InputOTP';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutationResult } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  defaultCallbackUrl: string;
  email: string;
  useCreateOneNextauthVerificationToken: () => UseMutationResult<
    unknown,
    Error,
    CreateOneNextauthVerificationTokenBody
  >;
  verificationCodeLength: number;
};

type FormSchema = { code: string };

export default function SignInVerify({
  defaultCallbackUrl,
  email,
  useCreateOneNextauthVerificationToken,
  verificationCodeLength,
}: Props) {
  const [next] = useQueryState('next', parseAsString);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    mutate: createVerificationToken,
    isPending: isCreatingVerificationToken,
  } = useCreateOneNextauthVerificationToken();
  const formSchema = useMemo(
    () =>
      z.object({
        code: z.string().length(verificationCodeLength, {
          message: 'Please enter a valid code',
        }),
      }),
    [verificationCodeLength]
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: '' },
  });

  const onSubmit = useCallback(
    async (values: FormSchema) => {
      if (isSigningIn) {
        return;
      }
      setIsSigningIn(true);
      const { code } = values;

      await signIn('credentials', {
        email,
        code,
        callbackUrl: next || defaultCallbackUrl,
      })
        .catch(() => {
          form.setError('code', { message: 'Invalid code' });
        })
        .finally(() => setIsSigningIn(false));
    },
    [isSigningIn, email, next, defaultCallbackUrl, form]
  );

  const handleComplete = useCallback(
    (value: string) => {
      form.setValue('code', value);
      void form.handleSubmit(onSubmit)();
    },
    [form, onSubmit]
  );

  const resendCode = () => {
    if (isCreatingVerificationToken) {
      return;
    }
    createVerificationToken(
      { email },
      {
        onSuccess: () => {
          form.reset({ code: undefined });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-5 sm:gap-y-6">
      <p className="text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl">
        Check your email for a verification code
      </p>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={verificationCodeLength}
                    {...field}
                    className="mx-auto w-full justify-center"
                    onComplete={handleComplete}
                  >
                    {Array.from(Array(verificationCodeLength).keys()).map(
                      (i) => (
                        <InputOTPGroup key={i}>
                          <InputOTPSlot
                            index={i}
                            className="size-11 bg-white text-base font-semibold text-black sm:size-12"
                          />
                        </InputOTPGroup>
                      )
                    )}
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="xl"
            disabled={isSigningIn}
            isLoading={isSigningIn}
            className="h-12 rounded-[12px]"
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant="link"
            size="xl"
            disabled={
              isCreatingVerificationToken || form.formState.isSubmitting
            }
            onClick={resendCode}
          >
            Resend code
          </Button>
        </form>
      </Form>
    </div>
  );
}
