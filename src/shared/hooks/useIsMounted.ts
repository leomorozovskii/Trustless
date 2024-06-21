import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useGlobalStore } from '@berezka-dao/core/store';

const IsMountedProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isMounted, mount } = useGlobalStore((state) => ({
    isMounted: state.isMounted,
    mount: state.mount,
  }));

  useEffect(() => {
    if (!isMounted) mount();
  }, [isMounted, mount]);

  return children;
};

const useIsMounted = () => {
  return useGlobalStore((state) => state.isMounted);
};

export { useIsMounted, IsMountedProvider };
