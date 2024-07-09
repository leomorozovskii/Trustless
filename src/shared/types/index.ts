import type { Address } from 'viem';

type Token = {
  address: Address;
  name: string;
  symbol: string;
  balance: string;
  decimals: number;
};

export type { Token };
