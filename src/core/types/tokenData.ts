import type { ComponentProps, FC } from 'react';
import type { Address } from 'viem';

// eslint-disable-next-line import/no-restricted-paths
import type { UnknownIcon } from '@berezka-dao/shared/icons/tokens';

interface TokenData {
  address: Address;
  name: string;
  logo: FC<ComponentProps<typeof UnknownIcon>>;
  decimals: number;
}

type TokenMap = Record<Address, TokenData>;

export type { TokenData, TokenMap };
