import { Loader2 } from 'lucide-react';

export default function LoadingPageView() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <Loader2 className="size-4 animate-spin" />
    </div>
  );
}
