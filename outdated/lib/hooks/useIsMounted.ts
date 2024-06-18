import React from 'react';
import { create } from 'zustand';

const useIsMountedStore = create<{ isMounted: boolean; mount: () => void }>((set) => ({
  isMounted: false,
  mount: () => set({ isMounted: true }),
}));

export function IsMountedProvider({ children }: React.PropsWithChildren): React.ReactNode {
  const { isMounted, mount } = useIsMountedStore((state) => ({
    isMounted: state.isMounted,
    mount: state.mount,
  }));

  React.useEffect(() => {
    if (!isMounted) mount();
  }, [isMounted, mount]);

  return children;
}

export function useIsMounted() {
  return useIsMountedStore((state) => state.isMounted);
}
