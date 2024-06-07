import { Address } from 'viem';

interface IToken {
  address: Address;
  name: string;
  symbol: string;
  balance: string;
  decimals: number;
}

interface IContractTokens {
  address: Address;
  abi: any;
  functionName: string;
}

interface IUserTokens {
  address: Address;
  tokenBalances: IUserToken[];
}

interface IUserToken {
  contractAddress: Address;
  tokenBalance: string;
}

export type { IToken, IContractTokens, IUserToken, IUserTokens };
