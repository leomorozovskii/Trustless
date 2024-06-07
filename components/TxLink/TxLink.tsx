import { EtherscanIcon } from '@assets/icons';
import { links } from '@lib/constants';
import { Hash } from 'viem';

type TxLinkProps = {
  hash: Hash;
};

const TxLink: React.FC<TxLinkProps> = ({ hash }) => {
  return (
    <a aria-label="Transaction hash" href={`${links.etherscan}/tx/${hash}`} target="_blank" rel="noopener noreferrer">
      <EtherscanIcon />
    </a>
  );
};

export { TxLink };
