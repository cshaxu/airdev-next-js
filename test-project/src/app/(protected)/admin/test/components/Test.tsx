'use client';

import Textarea from '@/frontend/components/ui/Textarea';

export default function Test() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <div className="h-auto min-h-[200px]">
        <Textarea
          className="h-full font-mono"
          placeholder="This is a test form"
          value=""
          // eslint-disable-next-line airdev/no-specific-string
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </div>
  );
}
