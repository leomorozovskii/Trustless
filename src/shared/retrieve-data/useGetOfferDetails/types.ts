import type { Address } from 'viem';

type OfferDetailsQueryRaw = {
  tradeOffer: {
    tokenFrom: {
      id: Address;
      symbol: string;
      decimals: string;
    };
    tokenTo: {
      id: Address;
      symbol: string;
      decimals: string;
    };
    amountFromWithFee: bigint;
    amountFrom: bigint;
    amountTo: bigint;
    creator: Address;
    active: boolean;
    optionalTaker: Address;
    completed: boolean;
  };
};

type OfferDetails = {
  tokenFrom: {
    address: Address;
    symbol: string;
    decimals: string;
  };
  tokenTo: {
    address: Address;
    symbol: string;
    decimals: string;
  };
  amountFromWithFee: bigint;
  amountFrom: bigint;
  amountTo: bigint;
  creator: Address;
  active: boolean;
  optionalTaker: Address;
  completed: boolean;
  formattedAmountTo: string;
  formattedAmountFrom: string;
  isCreator: boolean | undefined;
  isReceiver: boolean | undefined;
  fee: bigint;
  rateToFrom: number;
  isTokenFromCustom: boolean;
};

export type { OfferDetailsQueryRaw, OfferDetails };
