import React, { memo } from 'react';
import { useWallet } from '@context/wallet/WalletProvider';
import { WalletOption } from '@components/WalletOptions/components/WalletOption';

interface WalletOptionsProps {}

const WalletOptions: React.FC<WalletOptionsProps> = () => {
  const { connectors, connect } = useWallet();

  return (
    <div>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.id}
          connector={connector}
          onClick={() => connect(connector)}
        />
      ))}
    </div>
  );
};

export default memo(WalletOptions);
