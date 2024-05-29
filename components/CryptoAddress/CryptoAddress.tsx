import React, { useMemo, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { isAddress } from 'viem';
import cn from 'classnames';

import { CopyIcon } from '@assets/icons';

import s from './CryptoAddress.module.scss';

interface CryptoAddressProps {
  address: string;
  showFullAddress?: boolean;
}

const CryptoAddress: React.FC<CryptoAddressProps> = ({
  address,
  showFullAddress = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addressToShow = useMemo(() => {
    if (!isAddress(address)) return '';

    return showFullAddress
      ? address
      : `${address.slice(0, 4)}...${address.slice(-6)}`;
  }, [address, showFullAddress]);

  return (
    <Tooltip.Provider>
      <div className={s.cryptoAddress}>
        <button
          type="button"
          className={cn(s.copyButton, { copied })}
          onClick={handleCopy}
        >
          {addressToShow && (
            <>
              <span className={s.address} data-testid="crypto-address">
                <Tooltip.Root delayDuration={200}>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" side="bottom">
                      {address}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                  <Tooltip.Trigger>{addressToShow}</Tooltip.Trigger>
                </Tooltip.Root>
              </span>
              <CopyIcon />
            </>
          )}
        </button>
      </div>
    </Tooltip.Provider>
  );
};

export default CryptoAddress;
