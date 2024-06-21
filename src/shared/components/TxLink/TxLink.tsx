import type { FC } from 'react';
import type { Hash } from 'viem';

import { links } from '@berezka-dao/core/constants';
import { EtherscanIcon } from '@berezka-dao/shared/icons';

import s from './TxLink.module.scss';

type TxLinkProps = {
  hash: Hash;
};

const TxLink: FC<TxLinkProps> = ({ hash }) => {
  return (
    <a
      aria-label="Transaction hash"
      className={s.container}
      href={`${links.etherscan}/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <EtherscanIcon />
    </a>
  );
};

export { TxLink };
