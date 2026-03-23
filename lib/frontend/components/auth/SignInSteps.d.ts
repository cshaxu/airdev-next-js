import type { CreateOneNextauthVerificationTokenBody } from '@airdev/next/adapter/frontend/query/types';
import type { UseMutationResult } from '@tanstack/react-query';
type Props = {
    appName: string;
    defaultCallbackUrl: string;
    homeHref: string;
    ownerShort: string;
    privacyHref: string;
    termsHref: string;
    useCreateOneNextauthVerificationToken: () => UseMutationResult<unknown, Error, CreateOneNextauthVerificationTokenBody>;
    verificationCodeLength: number;
};
export default function SignInSteps({ appName, defaultCallbackUrl, homeHref, ownerShort, privacyHref, termsHref, useCreateOneNextauthVerificationToken, verificationCodeLength, }: Props): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=SignInSteps.d.ts.map