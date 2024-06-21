import type { Address } from 'viem';

import type { customErc20Abi } from '@berezka-dao/core/abis/customErc20Abi';

type ContractTokens = {
  address: Address;
  abi: typeof customErc20Abi;
  functionName: string;
};

type WalletTokens = {
  address: Address;
  tokenBalances: ResponseToken[];
};

type ResponseAlchemy = {
  result: WalletTokens;
};

type ResponseToken = {
  contractAddress: Address;
  tokenBalance: Address;
};

export type { ContractTokens, WalletTokens, ResponseAlchemy, ResponseToken };
