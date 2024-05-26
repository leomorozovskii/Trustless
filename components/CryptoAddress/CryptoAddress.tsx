import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import s from './CryptoAddress.module.scss';
import { CopyIcon } from '@assets/icons';
import { isValidCryptoAddress } from '@lib/utils/handleAddress';

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
    if (!isValidCryptoAddress(address)) return '';

    return showFullAddress
      ? address
      : `${address.slice(0, 4)}...${address.slice(-6)}`;
  }, [address, showFullAddress]);

  return (
    <div className={s.cryptoAddress}>
      {addressToShow && (
        <>
          <span className={s.address} data-testid="crypto-address">
            {addressToShow}
          </span>
          <button className={cn(s.copyButton, { copied })} onClick={handleCopy}>
            <CopyIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default CryptoAddress;
