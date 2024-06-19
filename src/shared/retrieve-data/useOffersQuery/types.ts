import type { Address, Hash } from 'viem';

type TradeOffer_filter = {
  creator?: Address;
  taker?: Address;
  id?: string;
  tokenFrom__symbol?: string;
  tokenTo__symbol?: string;
};

type OffersQueryVariables = {
  filters?: TradeOffer_filter;
  skip?: number;
  first?: number;
};

type OffersQueryTokenFragment = {
  decimals: string;
  symbol: string;
  id: Address;
};

type OffersQuery = {
  tradeOffers: {
    creationHash: Hash;
    creationTimestamp: number;
    cancelTimestamp: number;
    cancelHash: Hash;
    completed: boolean;
    amountTo: string;
    amountFrom: string;
    amountFromWithFee: string;
    active: boolean;
    optionalTaker: Address;
    takenHash: Hash;
    takenTimestamp: number;
    tokenFrom: OffersQueryTokenFragment;
    tokenTo: OffersQueryTokenFragment;
    tradeID: string;
  }[];
};

export type { OffersQueryTokenFragment, OffersQuery, OffersQueryVariables };
