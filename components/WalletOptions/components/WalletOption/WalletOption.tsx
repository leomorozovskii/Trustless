import React, { memo } from 'react';
import { Connector } from 'wagmi';

interface WalletOptionProps {
  connector: Connector;
  onClick: () => void;
}

const WalletOption: React.FC<WalletOptionProps> = ({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const checkProvider = async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    };
    checkProvider();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  );
};

export default memo(WalletOption);
