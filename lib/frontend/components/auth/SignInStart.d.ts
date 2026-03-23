import type { CreateOneNextauthVerificationTokenBody } from '@airdev/next/adapter/frontend/query/types';
import type { UseMutationResult } from '@tanstack/react-query';
type Props = {
    appName: string;
    homeHref: string;
    ownerShort: string;
    privacyHref: string;
    setEmail: (email: string) => void;
    termsHref: string;
    useCreateOneNextauthVerificationToken: () => UseMutationResult<unknown, Error, CreateOneNextauthVerificationTokenBody>;
};
export default function SignInStart({ appName, homeHref, ownerShort, privacyHref, setEmail, termsHref, useCreateOneNextauthVerificationToken, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SignInStart.d.ts.map