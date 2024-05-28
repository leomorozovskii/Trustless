import { CreateOfferState } from '@lib/constants';
import React from 'react';

interface IOfferValues {
  offerFromState: IOfferFrom;
  offerToState: IOfferTo;
  activeOfferStep: number;
  activeStep: CreateOfferState;
  setOfferFromState: React.Dispatch<Partial<IOfferFrom>>;
  setOfferToState: React.Dispatch<Partial<IOfferTo>>;
  setActiveOfferStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveStep: React.Dispatch<React.SetStateAction<CreateOfferState>>;
}

interface IOfferFrom {
  from: string;
  amount: number;
  rate: number;
}

type IOfferTo = Omit<IOfferFrom, 'from' | 'rate'> & {
  to: string;
  receiver?: string;
};

export type { IOfferValues, IOfferFrom, IOfferTo };
