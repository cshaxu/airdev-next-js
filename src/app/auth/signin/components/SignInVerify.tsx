'use client';

import { Button } from '@/frontend/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/frontend/components/ui/Form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/frontend/components/ui/InputOTP';
import { getAuthFrontendIntegration } from '@/integration/frontend/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = { email: string };

const verificationCodeLength = 5;
const formSchema = z.object({
  code: z.string().length(verificationCodeLength, {
    message: 'Please enter a valid code',
  }),
});
type FormSchema = z.infer<typeof formSchema>;

export default function SignInVerify({ email }: Props) {
  const authIntegration = getAuthFrontendIntegration();
  const [next] = useQueryState('next', parseAsString);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isResendingCode, setIsResendingCode] = useState(false);
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

      const result = await authIntegration.verifyEmailCode({
        callbackUrl: next || '/',
        code,
        email,
      });

      if (!result.ok) {
        form.setError('code', {
          message: result.errorMessage ?? 'Invalid code',
        });
      }

      setIsSigningIn(false);
    },
    [authIntegration, email, next, isSigningIn, form]
  );

  const handleComplete = useCallback(
    (value: string) => {
      form.setValue('code', value);
      void form.handleSubmit(onSubmit)();
    },
    [form, onSubmit]
  );

  const resendCode = async () => {
    if (isResendingCode) {
      return;
    }
    setIsResendingCode(true);
    await authIntegration.requestEmailCode(email);
    form.reset({ code: '' });
    setIsResendingCode(false);
  };

  return (
    <div className="flex flex-col gap-y-5 sm:gap-y-6">
      <p className="text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl">
        Check your email for a verification code
      </p>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit)(event);
          }}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={authIntegration.verificationCodeLength}
                    {...field}
                    className="mx-auto w-full justify-center"
                    onComplete={handleComplete}
                  >
                    {Array.from(
                      Array(authIntegration.verificationCodeLength).keys()
                    ).map((i) => (
                      <InputOTPGroup key={i}>
                        <InputOTPSlot
                          index={i}
                          className="size-11 bg-white text-base font-semibold text-black sm:size-12"
                        />
                      </InputOTPGroup>
                    ))}
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
            disabled={isResendingCode || form.formState.isSubmitting}
            onClick={() => void resendCode()}
          >
            Resend code
          </Button>
        </form>
      </Form>
    </div>
  );
}
