import type { CreateOneNextauthVerificationTokenBody } from '@airdev/next/adapter/frontend/query/types';
import type { UseMutationResult } from '@tanstack/react-query';
type Props = {
    defaultCallbackUrl: string;
    email: string;
    useCreateOneNextauthVerificationToken: () => UseMutationResult<unknown, Error, CreateOneNextauthVerificationTokenBody>;
    verificationCodeLength: number;
};
export default function SignInVerify({ defaultCallbackUrl, email, useCreateOneNextauthVerificationToken, verificationCodeLength, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SignInVerify.d.ts.map