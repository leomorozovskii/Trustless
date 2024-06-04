import { OfferProgress } from '@lib/constants';
import React from 'react';

interface IOfferValues {
  offerFromState: IOfferFrom;
  offerToState: IOfferTo;
  activeOfferStep: number;
  activeStep: OfferProgress;
  activeAcceptStep: OfferProgress;
  offerId: number | null;
  acceptId: string | null;
  customTokenName: string;
  inputsDisabled: boolean;
  setInputsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomTokenName: React.Dispatch<React.SetStateAction<string>>;
  setOfferId: React.Dispatch<React.SetStateAction<number | null>>;
  setAcceptId: React.Dispatch<React.SetStateAction<string | null>>;
  setOfferFromState: React.Dispatch<Partial<IOfferFrom>>;
  setOfferToState: React.Dispatch<Partial<IOfferTo>>;
  setActiveOfferStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveStep: React.Dispatch<React.SetStateAction<OfferProgress>>;
  setActiveAcceptStep: React.Dispatch<React.SetStateAction<OfferProgress>>;
}

interface IOfferFrom {
  from: string;
  amount: number;
  amountError?: string;
  decimals?: number;
  rate: number;
}

type IOfferTo = Omit<IOfferFrom, 'from' | 'rate'> & {
  to: string;
  receiver?: string;
};

export type { IOfferValues, IOfferFrom, IOfferTo };
