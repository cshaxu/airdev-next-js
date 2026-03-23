'use client';

import { useEffect, useState } from 'react';

// Both server and client components are pre-rendered on the server
// Server components are not hydrated on the client
// Client components are hydrated on the client
// However, there are "browser components" that cannot be pre-rendered on the server
// Use this hook to stop them from running on the server
export default function useIsBrowser() {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  return isBrowser;
}
