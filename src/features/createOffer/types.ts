import type React from 'react';
import type { Address } from 'viem';

interface IToken {
  address: Address;
  name: string;
  symbol: string;
  balance: string;
  decimals: number;
}

enum OfferProgress {
  None = 'none',
  Filled = 'filled',
  Approved = 'approved',
  Created = 'created',
}

interface IOfferCreateValues {
  offerFromState: IOfferFrom;
  offerToState: IOfferTo;
  activeOfferStep: number;
  activeStep: OfferProgress;
  offerId: number | null;
  customTokenName: string;
  inputsDisabled: boolean;
  userTokens: ITokensReducer;
  setUserTokens: React.Dispatch<Partial<ITokensReducer>>;
  setInputsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomTokenName: React.Dispatch<React.SetStateAction<string>>;
  setOfferId: React.Dispatch<React.SetStateAction<number | null>>;
  setOfferFromState: React.Dispatch<Partial<IOfferFrom>>;
  setOfferToState: React.Dispatch<Partial<IOfferTo>>;
  setActiveOfferStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveStep: React.Dispatch<React.SetStateAction<OfferProgress>>;
}

interface IOfferFrom {
  from: string;
  amount: string;
  amountError?: string;
  isInfinite: boolean;
  decimals?: number;
  rate: string;
}

interface ITokensReducer {
  tokens: IToken[] | null;
  isLoading: boolean;
}

type IOfferTo = Omit<IOfferFrom, 'from' | 'rate' | 'isInfinite'> & {
  to: string;
  receiver?: string;
};

export type { IOfferCreateValues, IOfferFrom, IOfferTo, ITokensReducer, IToken };
export { OfferProgress };
