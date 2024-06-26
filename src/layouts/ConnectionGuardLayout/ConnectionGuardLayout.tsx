import type { FC, PropsWithChildren } from 'react';
import { useAccount } from 'wagmi';

import { NotConnectedMessage } from '@berezka-dao/shared/components/NotConnectedMessage';
import { useIsMounted } from '@berezka-dao/shared/hooks/useIsMounted';

import { HeaderLayout } from '../HeaderLayout';

const ConnectionGuardLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isConnected } = useAccount();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (!isConnected) {
    return (
      <HeaderLayout>
        <NotConnectedMessage />
      </HeaderLayout>
    );
  }

  return children;
};

export { ConnectionGuardLayout };
