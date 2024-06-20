import type { Dispatch, SetStateAction } from 'react';
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
  inputsDisabled: boolean;
  userTokens: ITokensReducer;
  setUserTokens: Dispatch<Partial<ITokensReducer>>;
  setInputsDisabled: Dispatch<SetStateAction<boolean>>;
  setOfferId: Dispatch<SetStateAction<number | null>>;
  setOfferFromState: Dispatch<Partial<IOfferFrom>>;
  setOfferToState: Dispatch<Partial<IOfferTo>>;
  setActiveOfferStep: Dispatch<SetStateAction<number>>;
  setActiveStep: Dispatch<SetStateAction<OfferProgress>>;
}

interface IOfferFrom {
  from?: Address;
  amount: string;
  amountError?: string;
  customTokenName?: string;
  isInfinite: boolean;
  decimals?: number;
  rate: string;
}

interface ITokensReducer {
  tokens: IToken[] | null;
  isLoading: boolean;
}

type IOfferTo = Omit<IOfferFrom, 'from' | 'rate' | 'isInfinite'> & {
  to?: Address;
  receiver?: string;
};

export type { IOfferCreateValues, IOfferFrom, IOfferTo, ITokensReducer, IToken };
export { OfferProgress };
