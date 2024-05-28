import React, { memo } from 'react';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

interface WalletAccountProps {}

const WalletAccount: React.FC<WalletAccountProps> = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <div>
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
};

export default memo(WalletAccount);
