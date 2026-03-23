type Props = {
  appName: string;
  isVerificationError: boolean;
  logoSrc: string;
};

export default function AuthError({
  appName,
  isVerificationError,
  logoSrc,
}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 space-x-2">
        <h1 className="text-2xl font-bold">Unable to sign in</h1>
        <img className="h-24 w-24" src={logoSrc} alt={appName} />
        {isVerificationError ? (
          <p className="px-6 text-lg">
            The verification code is no longer valid. It may have been used
            already or it may have expired. Please request a new verification
            code.
          </p>
        ) : (
          <p className="mx-3 text-lg">
            Something went wrong. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
