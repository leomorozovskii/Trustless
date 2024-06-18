import { EtherscanIcon } from '@assets/icons';
import { links } from '@lib/constants';
import { Hash } from 'viem';

import s from './TxLink.module.scss';

type TxLinkProps = {
  hash: Hash;
};

const TxLink: React.FC<TxLinkProps> = ({ hash }) => {
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
