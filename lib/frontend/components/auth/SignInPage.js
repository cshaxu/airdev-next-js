import { jsx as _jsx } from "react/jsx-runtime";
import { currentUserServerQueryOptions } from '../../hooks/data/user-server';
import { pageTitle, withError } from '../../utils/page';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import SignInSteps from './SignInSteps';
export async function generateSignInMetadata() {
    return {
        title: pageTitle('Sign In'),
        description: 'Sign in to continue practicing with hanzi.study.',
        robots: {
            index: false,
            follow: false,
        },
    };
}
async function SignInPage({ searchParams, }) {
    const queryClient = new QueryClient();
    const { next } = await searchParams;
    const currentUser = await queryClient.fetchQuery(currentUserServerQueryOptions);
    if (currentUser) {
        redirect(next || '/');
    }
    return _jsx(SignInSteps, {});
}
export default withError(SignInPage);
//# sourceMappingURL=SignInPage.js.map