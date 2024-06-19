import React from 'react';

import { useGlobalStore } from '@berezka-dao/core/store';

const IsMountedProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isMounted, mount } = useGlobalStore((state) => ({
    isMounted: state.isMounted,
    mount: state.mount,
  }));

  React.useEffect(() => {
    if (!isMounted) mount();
  }, [isMounted, mount]);

  return children;
};

const useIsMounted = () => {
  return useGlobalStore((state) => state.isMounted);
};

export { useIsMounted, IsMountedProvider };
