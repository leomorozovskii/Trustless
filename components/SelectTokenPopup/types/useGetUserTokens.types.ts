import { Address, erc20Abi } from 'viem';

interface IToken {
  address: Address;
  name: string;
  symbol: string;
  balance: string;
  decimals: number;
}

interface IContractTokens {
  address: Address;
  abi: typeof erc20Abi;
  functionName: string;
}

interface IResponseToken {
  contractAddress: Address;
  tokenBalance: Address;
}

export type { IToken, IContractTokens, IResponseToken };
