import SignInPage, {
  generateSignInMetadata,
} from '@airdev/next/frontend/components/auth/SignInPage';

export const dynamic = 'force-dynamic';

export const generateMetadata = generateSignInMetadata;

export default SignInPage;
