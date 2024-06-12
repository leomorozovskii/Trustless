import { Address } from 'viem';

import { IconProps } from '@assets/icons/tokens';

export interface TokenData {
  address: Address;
  name: string;
  logo: React.FC<IconProps>;
  decimals: number;
}

export type TokenMap = Record<Address, TokenData>;
