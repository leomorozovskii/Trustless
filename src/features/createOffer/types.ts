import type { Dispatch, SetStateAction } from 'react';
import type { Address } from 'viem';

type Token = {
  address: Address;
  name: string;
  symbol: string;
  balance: string;
  decimals: number;
};

enum OfferProgress {
  None = 'none',
  Filled = 'filled',
  Approved = 'approved',
  Created = 'created',
}

type OfferCreateValues = {
  offerFromState: OfferFrom;
  offerToState: OfferTo;
  activeOfferStep: number;
  activeStep: OfferProgress;
  offerId: number | null;
  inputsDisabled: boolean;
  userTokens: TokensReducer;
  setUserTokens: Dispatch<Partial<TokensReducer>>;
  setInputsDisabled: Dispatch<SetStateAction<boolean>>;
  setOfferId: Dispatch<SetStateAction<number | null>>;
  setOfferFromState: Dispatch<Partial<OfferFrom>>;
  setOfferToState: Dispatch<Partial<OfferTo>>;
  setActiveOfferStep: Dispatch<SetStateAction<number>>;
  setActiveStep: Dispatch<SetStateAction<OfferProgress>>;
};

type OfferFrom = {
  from?: Address;
  amount: string;
  amountError?: string;
  customTokenName?: string;
  isInfinite: boolean;
  decimals?: number;
  rate: string;
};

type TokensReducer = {
  tokens: Token[] | null;
  isLoading: boolean;
};

type OfferTo = Omit<OfferFrom, 'from' | 'rate' | 'isInfinite'> & {
  to?: Address;
  receiver?: string;
};

export type { OfferCreateValues, OfferFrom, OfferTo, TokensReducer, Token };
export { OfferProgress };
