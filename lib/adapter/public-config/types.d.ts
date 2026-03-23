export type Environment = 'local' | 'production';
export type PublicAppConfig = {
    name: string;
    owner: string;
    ownerShort: string;
    mainUrl: string;
    email: string;
    description: string;
};
export type PublicAuthConfig = {
    verificationCodeLength: number;
};
export type PublicPosthogConfig = {
    apiHost: string;
    apiToken: string;
};
export type PublicServiceConfig = {
    environment: Environment;
    rootDomain: string;
    titlePrefix: string;
};
export type PublicConfig = {
    app: PublicAppConfig;
    auth: PublicAuthConfig;
    posthog: PublicPosthogConfig;
    service: PublicServiceConfig;
};
//# sourceMappingURL=types.d.ts.map