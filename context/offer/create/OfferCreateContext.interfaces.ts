import { OfferProgress } from '@lib/constants';
import React from 'react';

interface IOfferCreateValues {
  offerFromState: IOfferFrom;
  offerToState: IOfferTo;
  activeOfferStep: number;
  activeStep: OfferProgress;
  offerId: number | null;
  customTokenName: string;
  inputsDisabled: boolean;
  isFeeIncluded: boolean;
  setIsFeeIncluded: React.Dispatch<React.SetStateAction<boolean>>;
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
  decimals?: number;
  rate: number;
}

type IOfferTo = Omit<IOfferFrom, 'from' | 'rate'> & {
  to: string;
  receiver?: string;
};

export type { IOfferCreateValues, IOfferFrom, IOfferTo };
