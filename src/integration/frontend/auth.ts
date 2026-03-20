export type AuthErrorViewModel = {
  description: string;
  title: string;
};

export type AuthBranding = {
  appName: string;
  appOwnerShort?: string;
  heroDecorationSrc?: string;
  heroDescription?: string;
  heroLogoAlt?: string;
  heroLogoSrc?: string;
};

export interface AuthFrontendIntegration {
  branding: AuthBranding;
  getErrorViewModel: (error?: string | null) => AuthErrorViewModel;
  requestEmailCode: (email: string) => Promise<void>;
  signInWithGoogle: (callbackUrl: string) => Promise<void> | void;
  termsHref: string;
  privacyHref: string;
  verifyEmailCode: (params: {
    callbackUrl: string;
    code: string;
    email: string;
  }) => Promise<{ errorMessage?: string; ok: boolean }>;
  verificationCodeLength: number;
}

const defaultIntegration: AuthFrontendIntegration = {
  branding: {
    appName: 'Airdev App',
    appOwnerShort: 'Airdev',
    heroDecorationSrc: '/math-symbols.svg',
    heroDescription: 'Your sample app',
    heroLogoAlt: 'clipboard',
    heroLogoSrc: '/clipboard.svg',
  },
  getErrorViewModel: (error) => {
    if (error === 'Verification') {
      return {
        title: 'Unable to sign in',
        description:
          'The verification code is no longer valid. It may have been used already or it may have expired. Please request a new verification code.',
      };
    }

    return {
      title: 'Unable to sign in',
      description: 'Something went wrong. Please try again later.',
    };
  },
  async requestEmailCode() {},
  privacyHref: '/privacy',
  async signInWithGoogle() {},
  termsHref: '/terms',
  async verifyEmailCode() {
    return {
      ok: false,
      errorMessage: 'Authentication integration not configured',
    };
  },
  verificationCodeLength: 5,
};

let authFrontendIntegration: AuthFrontendIntegration | null = null;

export function setAuthFrontendIntegration(
  integration: AuthFrontendIntegration
): void {
  authFrontendIntegration = integration;
}

export function getAuthFrontendIntegration(): AuthFrontendIntegration {
  return authFrontendIntegration ?? defaultIntegration;
}

export function hasAuthFrontendIntegration(): boolean {
  return authFrontendIntegration !== null;
}
