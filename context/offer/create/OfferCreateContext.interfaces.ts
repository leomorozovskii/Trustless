import React from 'react';

import { IToken } from '@components/SelectTokenPopup/types/useGetUserTokens.types';
import { OfferProgress } from '@lib/constants';

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
  approvedAddress: string | null;
  decimals?: number;
  rate: string;
}

interface ITokensReducer {
  tokens: IToken[] | null;
  isLoading: boolean;
}

type IOfferTo = Omit<IOfferFrom, 'from' | 'rate' | 'approvedAddress'> & {
  to: string;
  receiver?: string;
};

export type { IOfferCreateValues, IOfferFrom, IOfferTo, ITokensReducer };
